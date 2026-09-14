import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { robotsContent } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";
import { getPlateViewSummary } from "@/lib/plateInterest.functions";
import { listAllPlates } from "@/lib/plates.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => {
    const title = "Catalogue administration — Beta Art";
    const description =
      "Restricted administration view of Beta Art catalogue records, verification status and publication state.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "robots", content: robotsContent },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h1 className="display text-3xl">Access denied</h1>
        <p className="mt-4 text-sm text-muted-foreground">{error.message}</p>
      </main>
      <SiteFooter />
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background px-5 py-24 text-foreground">
      <p className="mx-auto max-w-3xl">Not found.</p>
    </div>
  ),
  component: AdminPage,
});

function AdminPage() {
  const fetchPlates = useServerFn(listAllPlates);
  const fetchViewSummary = useServerFn(getPlateViewSummary);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "plates"],
    queryFn: () => fetchPlates(),
    retry: false,
  });

  const {
    data: viewData,
    isPending: viewPending,
    error: viewError,
  } = useQuery({
    queryKey: ["admin", "plate-view-summary"],
    queryFn: () => fetchViewSummary(),
    retry: false,
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label">Restricted</p>
            <h1 className="display mt-3 text-4xl">Catalogue administration</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every record below is unpublished until its verification gates are satisfied. Pricing
              is draft and indicative.
            </p>
          </div>
          <button type="button" onClick={signOut} className="btn-outline-ink focus-ring">
            Sign out
          </button>
        </div>

        {isPending ? <p className="mt-12 text-sm text-muted-foreground">Loading records…</p> : null}

        {error ? (
          <p role="alert" className="mt-12 text-sm text-muted-foreground">
            {error.message}
          </p>
        ) : null}

        {data ? (
          <div className="mt-12 overflow-x-auto border border-border">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <caption className="sr-only">Catalogue records and their publication state</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="label p-4">
                    Catalogue
                  </th>
                  <th scope="col" className="label p-4">
                    Title
                  </th>
                  <th scope="col" className="label p-4">
                    Verification
                  </th>
                  <th scope="col" className="label p-4">
                    RAW archived
                  </th>
                  <th scope="col" className="label p-4">
                    Draft price
                  </th>
                  <th scope="col" className="label p-4">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.plates.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="p-4 font-mono text-xs">{p.catalogue}</td>
                    <td className="p-4">{p.title}</td>
                    <td className="p-4 text-muted-foreground">{p.verification_status}</td>
                    <td className="p-4 text-muted-foreground">{p.raw_archived ? "Yes" : "No"}</td>
                    <td className="p-4 text-muted-foreground">
                      kr {p.price_minor} {p.currency} — draft
                    </td>
                    <td className="p-4 text-muted-foreground">{p.published ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="mt-20">
          <p className="label">Anonim, oturum-tabanlı</p>
          <h2 className="display mt-3 text-2xl">Ziyaretçi ilgisi</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Kimliksiz görüntüleme sayımları — bkz. Privacy Policy, "Cookies and analytics". Yalnızca
            hangi katalog kaydının ilgi gördüğünü gösterir; hiçbir ziyaretçi tanımlanamaz.
          </p>

          {viewPending ? <p className="mt-8 text-sm text-muted-foreground">Yükleniyor…</p> : null}
          {viewError ? (
            <p role="alert" className="mt-8 text-sm text-muted-foreground">
              {viewError.message}
            </p>
          ) : null}

          {viewData && viewData.summary.length > 0 ? (
            <div className="mt-8 overflow-x-auto border border-border">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">Plaka başına toplu görüntüleme sayımı</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="label p-4">
                      Plaka
                    </th>
                    <th scope="col" className="label p-4">
                      Görüntüleme
                    </th>
                    <th scope="col" className="label p-4">
                      Benzersiz oturum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewData.summary.map((row) => (
                    <tr key={row.plate_slug} className="border-b border-border last:border-0">
                      <td className="p-4 font-mono text-xs">{row.plate_slug}</td>
                      <td className="p-4 text-muted-foreground">{row.views}</td>
                      <td className="p-4 text-muted-foreground">{row.unique_sessions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : viewData ? (
            <p className="mt-8 text-sm text-muted-foreground">Henüz kayıtlı görüntüleme yok.</p>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
