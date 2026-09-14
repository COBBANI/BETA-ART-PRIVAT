import { careApi, type CareEnv } from '../lib/care-api';
/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: {fetch: (r: Request)=>Promise<Response>};
  DB: CareEnv['DB'];
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if(url.pathname.startsWith('/api/')) return careApi(request, env as unknown as CareEnv);
    const legacy: Record<string,string> = {'/index.html':'/nb','/trenger-hjelp.html':'/nb/booking','/familie.html':'/nb/family','/oppdrag.html':'/nb/jobs','/trygghet.html':'/nb/safety','/bli-hjelper.html':'/nb/helper','/personvern.html':'/nb/privacy','/drift.html':'/nb/operations'};
    if(legacy[url.pathname]) return Response.redirect(new URL(legacy[url.pathname],url.origin),308);


    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    // Root layouts cannot rely on params from a child route. Derive the document
    // language from the URL and overwrite any visitor-supplied header.
    const pageHeaders = new Headers(request.headers);
    const pageLang = url.pathname.split('/')[1];
    pageHeaders.set('x-naviar-language', ['nb', 'en', 'tr'].includes(pageLang) ? pageLang : 'nb');
    const response = await handler.fetch(new Request(request, { headers: pageHeaders }), env, ctx);
    const secured=new Response(response.body,response);
    secured.headers.set('X-Content-Type-Options','nosniff');
    secured.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    secured.headers.set('Permissions-Policy','geolocation=(), microphone=(), camera=()');
    secured.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://checkout.stripe.com");
    return secured;
  },
};

export default worker;
