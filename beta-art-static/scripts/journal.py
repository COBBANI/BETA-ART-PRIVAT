# Field Notes — the journal entries.
#
# The index page advertised ten essays and every one of them linked to the same
# file. This is the data the missing nine are built from; build_journal.py turns
# it into pages and rewrites the index so the links go where they claim to.
#
# Body grammar: ("h2", text) ("p", html) ("ul", [items]) ("ol", [items])
#               ("q", text) ("table", (caption, [headers], [[cells]]))

TOPICS = {"provenance": "Provenance", "method": "Method", "light": "Light",
          "trade": "Trade", "market": "Market"}

J = []
def add(**k): J.append(k)


# --------------------------------------------------------------------------
add(slug="three-tests", topic="method", date="2026-07-14", shown="14 July 2026",
    read="6 min", frame="frame-4",
    fig="Placeholder — a workshop bench under a north window",
    cap="BA-B1-004 · <em>Boatbuilder's bench</em> · placeholder pending the verified original",
    title="The three tests every frame has to pass",
    short="The three tests every frame has to pass",
    desc="Provenance, not reproducible by a machine, and a named buyer. A frame "
         "has to clear all three before it is catalogued.",
    excerpt="Provenance, not reproducible by a machine, and a named buyer. Fail one and "
            "the frame stays personal &mdash; technically good is not on the list.",
    lead="A photograph can be excellent and still not belong in a licensing archive. "
         "Three questions decide it, and a frame has to clear all three.",
    body=[
 ("p", "You will take more good photographs than you can sell, and the gap between "
       "those two numbers is where most archives quietly rot. Frames go in because "
       "they are good. Nobody ever takes one out. Nine years later the catalogue is "
       "four thousand images deep and a buyer cannot find anything in it."),
 ("p", "So there is a gate, and it has three questions. A frame that fails any one of "
       "them does not enter the catalogue. It is not deleted &mdash; it goes to the "
       "personal archive, which is a different thing with a different purpose."),
 ("h2", "One: can you say exactly where it came from?"),
 ("p", "Body, lens, exposure, date, time, place. Written at the shoot, not "
       "reconstructed at the edit. The RAW original filed within a day, with a "
       "checksum, under a name that will still make sense to a stranger."),
 ("p", "If a frame reaches the catalogue stage and any of that is missing, it fails "
       "here. Not because the picture is worse, but because a licence you cannot "
       "stand behind is a liability priced as an asset."),
 ("h2", "Two: could a machine have made it?"),
 ("p", "This is the harshest of the three and the one that removes the most "
       "photographs. Ask it honestly: is this a specific person, in a specific place, "
       "at a specific hour &mdash; or is it a beautiful arrangement of light that any "
       "competent generator can now produce on request?"),
 ("p", "A fjord at sunset fails. A named boatbuilder's hands on a plane he has used "
       "for thirty years does not. The difference is not craft. It is whether the "
       "frame contains anything that had to be true."),
 ("q", "Generic beauty used to be scarce. It stopped being scarce, and nobody sent a notice."),
 ("h2", "Three: can you name a buyer?"),
 ("p", "Not a category &mdash; a buyer. An actual organisation, by name, that would pay "
       "kr 890 for this frame and be pleased with the trade. If you cannot get past "
       "\"agencies, probably\", the answer is no."),
 ("p", "This test feels commercial and slightly rude, and it is the one that saves the "
       "most time. A catalogue is a shop. Every frame in it is either earning its "
       "shelf space or hiding the frames that would."),
 ("h2", "Why all three, rather than the best two"),
 ("p", "Each test removes a different failure. Skip the first and you build a "
       "collection you cannot defend when someone asks where an image came from. Skip "
       "the second and you compete on price against something with no marginal cost. "
       "Skip the third and you build a beautiful archive that never pays for the "
       "drive out."),
 ("p", "Two out of three is the seductive option, because there is always one frame "
       "worth making an exception for. That exception is how the four-thousand-image "
       "catalogue starts."),
 ("h2", "What happens to the ones that fail"),
 ("p", "They stay. In a separate archive, filed the same way, with the same capture "
       "record &mdash; because a frame that fails the buyer test today can pass it in "
       "two years when the work changes, and reconstructing provenance later is "
       "impossible."),
 ("p", "That is the only part of this worth copying if you keep an archive of your "
       "own. Keep the gate strict and the records complete on both sides of it. The "
       "gate protects the buyer; the records protect you."),
    ])

# --------------------------------------------------------------------------
add(slug="accession-label", topic="provenance", date="2026-06-30", shown="30 June 2026",
    read="7 min", frame="frame-5",
    fig="Placeholder — a catalogue card under raking light",
    cap="BA-A1-002 · <em>Accession card</em> · placeholder pending the verified original",
    title="What actually goes on an accession label",
    short="What actually goes on an accession label",
    desc="The fields on a catalogue record, why each one is there, and the three "
         "buyers ask about long after the campaign has ended.",
    excerpt="Camera, lens, exposure, time, coordinates &mdash; and the three fields buyers "
            "ask about long after the campaign has ended.",
    lead="Every plate carries a record. Here is every field on it, what each one is "
         "for, and which ones you will be asked about years later.",
    body=[
 ("p", "An accession label is not a caption. A caption is written for a reader; a "
       "label is written for whoever has to answer a question about this image in "
       "2035, when the shoot is forgotten and the person who was there has moved on."),
 ("p", "The label below is the actual record structure behind every plate in the "
       "archive. It is deliberately unexciting."),
 ("h2", "Identity"),
 ("ul", ["<strong>Accession number.</strong> BA-A1-001. Property, tier, sequence. It "
         "never changes and it is never reused, because it is printed on plates and "
         "encoded into every QR code that resolves to this frame.",
         "<strong>Title.</strong> Descriptive rather than poetic. A buyer searching "
         "for a boatbuilder will not search for <em>Hands, Remembering</em>.",
         "<strong>Category and keywords.</strong> Written for the buyer's vocabulary, "
         "not the photographer's."]),
 ("h2", "Capture"),
 ("ul", ["<strong>Date and time,</strong> to the minute. Light is an argument and the "
         "clock is the evidence.",
         "<strong>Place,</strong> named and, where it does not endanger anyone, "
         "co-ordinates.",
         "<strong>Body, lens, exposure.</strong> Aperture, shutter, ISO. Partly "
         "provenance, partly so the shot can be repeated in the same conditions.",
         "<strong>Frame orientation and aspect,</strong> so a designer knows before "
         "opening the file whether it fits the space."]),
 ("h2", "Custody"),
 ("ul", ["<strong>RAW on record.</strong> Yes or no. There is no third answer, and "
         "no plate is marked verified without it.",
         "<strong>Content credentials.</strong> Signed in camera, or not signed. "
         "Retro-signing is recorded as retro-signing.",
         "<strong>Status.</strong> Draft, in review, verified. A plate can be "
         "published before it is verified; it cannot be sold as verified before it is."]),
 ("h2", "People and permission"),
 ("p", "This is the section that decides whether a frame can be licensed at all, and "
       "it is the section most archives fill in last."),
 ("ul", ["<strong>People in frame.</strong> Recognisable or not. If recognisable, "
         "named on the release rather than described.",
         "<strong>Release on file,</strong> with a date and the four separate "
         "consents it covers: the archive, commercial licensing, promotion, and use "
         "of the person's name. The form this archive uses is "
         "<a href=\"https://beta-art.com/release.html\">published "
         "in full</a>, in Norwegian, so anyone can read it before agreeing to anything.",
         "<strong>Property, artwork and heritage permissions,</strong> where a "
         "building, a work of art or a protected site is the subject rather than the "
         "background.",
         "<strong>Editorial only.</strong> A flag, not a footnote. It travels with "
         "the file into the licence."]),
 ("q", "The three fields you will be asked about years later: who is in it, who said yes, and where is the original."),
 ("h2", "The three that get asked about"),
 ("p", "Buyers rarely ask about the lens. In practice, three fields come back: the "
       "release, the RAW, and the status. They come back when a campaign is being "
       "audited, when an image is challenged, or when a legal team is reviewing "
       "assets before a rebrand &mdash; all of which happen long after the invoice cleared."),
 ("p", "If the answer already exists in the record, the exchange takes four minutes. "
       "If it does not, it becomes a reconstruction, and a reconstruction is not "
       "provenance. That difference is the entire value of the label."),
 ("h2", "Fill it in at the shoot"),
 ("p", "The record is written the same day, not the same month. Every field you "
       "postpone gets filled from memory, and memory is the least reliable instrument "
       "in the bag. A record made before anyone doubted it is worth more than a "
       "perfect one assembled afterwards."),
    ])

# --------------------------------------------------------------------------
add(slug="two-days-aboard", topic="method", date="2026-06-12", shown="12 June 2026",
    read="5 min", frame="frame-6",
    fig="Placeholder — a small boat deck before dawn",
    cap="BA-A1-001 · <em>Fisher at first light</em> · placeholder pending the verified original",
    title="Two days aboard before the first frame",
    short="Two days aboard before the first frame",
    desc="Why the fisher plate could not be photographed on day one, and what "
         "changes once nobody is performing for the camera.",
    excerpt="Why the fisher plate could not be shot on day one, and what changes in the "
            "pictures once nobody is performing for the camera.",
    lead="Two days of not photographing anything is not lost time. It is the only "
         "part of the process that cannot be bought back later.",
    body=[
 ("p", "The plan was one morning out and back. It became three, and the frame that "
       "was eventually catalogued was taken on the third."),
 ("p", "Nothing went wrong on day one. The light was good, the sea was workable, the "
       "pictures were competent. They were also, every one of them, pictures of a man "
       "being photographed."),
 ("h2", "What a camera does to a working deck"),
 ("p", "People do not become false in front of a lens. They become careful. Movements "
       "get tidier, hands find something to do, and the small unglamorous gestures "
       "that make a work photograph readable stop happening &mdash; because they are "
       "the ones nobody would choose to be seen doing."),
 ("p", "You can see it in the frames afterwards. There is a particular emptiness to a "
       "picture where everyone is behaving well."),
 ("h2", "Day two: put the camera down"),
 ("p", "The second morning the camera stayed in the bag for four hours. Not as a "
       "technique &mdash; there was work to be in the way of, and being in the way is "
       "how you learn where to stand. Where the ropes run. Which minute the light "
       "comes over the breakwater. When it is safe to ask a question and when it is "
       "very much not."),
 ("p", "By the afternoon the camera came out and drew no attention. That is the whole "
       "mechanism. Not trust in any warm sense &mdash; just the boredom that follows "
       "an unremarkable object being present for long enough."),
 ("q", "You are not waiting for a moment. You are waiting to stop being an event."),
 ("h2", "Day three: the frame"),
 ("p", "05:12, hauling, no instruction given and none needed. The picture is not "
       "technically better than the day-one frames. It is a different category of "
       "picture: something happened, and a camera was present, rather than something "
       "was arranged so a camera could be present."),
 ("h2", "What it costs, honestly"),
 ("p", "Three days for one plate is expensive, and it is not affordable for every "
       "frame in a catalogue. It is affordable for the frames that carry the "
       "collection &mdash; and those are exactly the ones that cannot be arranged."),
 ("p", "There is a commercial argument here too, and it is not sentimental. A "
       "generator can produce a fisherman at dawn on request, instantly, at no "
       "marginal cost. It cannot produce this fisherman, on this morning, with a "
       "release he signed and a record of the weather. The two days are what makes "
       "the frame unrepeatable, and unrepeatable is the only thing left worth selling."),
 ("h2", "If you are planning a shoot like this"),
 ("ol", ["Ask permission for more days than you need, and say why. People agree far "
         "more often than photographers expect.",
         "Spend the first block without the camera, visibly. It is read as respect, "
         "and it is meant as respect.",
         "Get the <a href=\"https://beta-art.com/release.html\">release</a> "
         "signed early, in person, while there is time to explain it properly "
         "&mdash; not by email a fortnight later.",
         "Write the capture record the same evening, aboard or ashore, before the "
         "days blur together."]),
    ])

# --------------------------------------------------------------------------
add(slug="just-for-social", topic="trade", date="2026-05-28", shown="28 May 2026",
    read="8 min", frame="frame-7",
    fig="Placeholder — a licence document on a desk",
    cap="Licence terms · placeholder imagery",
    title="Pricing a licence when the buyer says “just for social”",
    seotitle="Pricing a licence for “just for social”",
    short="Pricing a licence when the buyer says &ldquo;just for social&rdquo;",
    desc="Media, term and territory are three separate questions. “Just for "
         "social” answers none of them, and it is rarely meant unkindly.",
    excerpt="Media, term and territory are three separate questions. “Just for social” "
            "answers none of them &mdash; and it is rarely meant unkindly.",
    lead="It sounds like a small ask, and it usually is not. Three questions turn it "
         "into a number, and none of them are hostile.",
    body=[
 ("p", "“We just need it for social” is one of the most common sentences in "
       "licensing, and it is almost never an attempt to underpay. It is shorthand "
       "from someone who has a channel to fill and no reason to know that a licence "
       "has moving parts."),
 ("p", "Treating it as a negotiating tactic is a mistake. Treat it as an incomplete "
       "brief, and ask the three questions that complete it."),
 ("h2", "One: which media, exactly?"),
 ("p", "“Social” covers an organic post on one channel and a paid campaign "
       "running across five with a budget behind it. Those are different products. "
       "One is seen by the people who already follow the company; the other is bought "
       "reach, and bought reach is advertising whichever platform it lands on."),
 ("p", "Ask it plainly: organic only, or will there be money behind it? Nobody has "
       "ever been offended by that question, because it is the question their own "
       "media planner asked them last week."),
 ("h2", "Two: for how long?"),
 ("p", "A post lives forever unless someone deletes it. “A campaign” might "
       "mean six weeks or it might mean until the next rebrand. Term is the field "
       "most often left blank, and the one that causes trouble years later when an "
       "image is still running and nobody can find the paperwork."),
 ("p", "Twelve months is a reasonable default for most social licences. Perpetual is "
       "available and costs more, which is exactly the right shape: a buyer who "
       "genuinely needs forever will pay for forever, and one who does not will "
       "happily take a year."),
 ("h2", "Three: where?"),
 ("p", "Territory sounds like a formality for social media, which does not respect "
       "borders. It is not. A Norwegian shop posting to a Norwegian audience is not "
       "buying the same thing as a brand running the frame in eleven markets, and the "
       "second one knows it."),
 ("q", "Media, term, territory. Any two without the third is a licence someone will argue about later."),
 ("h2", "What that turns into"),
 ("p", "In this archive it collapses to four tiers, published rather than quoted, so "
       "a buyer can decide before speaking to anyone:"),
 ("ul", ["<strong>Personal, kr 190.</strong> Private projects, gifts, a personal site. "
         "No business use of any kind.",
         "<strong>Commercial, kr 890.</strong> One business, on marketing, web, social "
         "and print up to 5,000 copies. This is what “just for social” "
         "usually means once it is written down.",
         "<strong>Extended, kr 2 900.</strong> Unlimited print, products for resale, "
         "national campaigns, and one client sublicence for agencies.",
         "<strong>Custom and exclusive,</strong> quoted. Exclusivity has a real cost "
         "&mdash; it removes the frame from everyone else &mdash; and it is priced "
         "against that, not against the buyer's budget."]),
 ("h2", "Why the prices are on the page"),
 ("p", "Price on request means a buyer has to start a conversation to find out "
       "whether a conversation is worth having. Most will not. The ones who do arrive "
       "warier than they need to be, because an unpublished price reads as a price "
       "that depends on who is asking."),
 ("p", "Publishing the ladder does something better than winning that particular "
       "argument: it moves the discussion off the number and onto the scope, which is "
       "where it belonged from the start."),
 ("h2", "The sentence that ends it well"),
 ("p", "When the answer comes back as one channel, twelve months, Norway, the reply "
       "is short. That is the commercial licence, kr 890, and here is what it covers. "
       "The buyer gets a number in one message instead of three, and you get a scope "
       "written down."),
 ("p", "If the answer is five channels, perpetual, eleven markets &mdash; that is a "
       "different tier, and the buyer already suspected as much. Asking made the ask "
       "reasonable. Guessing would have made it a discount or an argument."),
    ])

# --------------------------------------------------------------------------
add(slug="who-buys-photography", topic="market", date="2026-05-19", shown="19 May 2026",
    read="11 min", frame="frame-8",
    fig="Placeholder — an office window at dusk",
    cap="Market notes · placeholder imagery",
    title="Who actually buys photography in Norway",
    short="Who actually buys photography in Norway",
    desc="Thirty industries in four tiers, from agencies buying weekly to recruiters "
         "discovering employer branding, and the ten worth contacting first.",
    excerpt="Thirty industries in four tiers, from advertising agencies buying daily to "
            "recruiters discovering employer branding &mdash; and the ten segments worth "
            "contacting first.",
    lead="Thirty industries, sorted by how often they buy rather than how much they "
         "have. The order is not the one most photographers assume.",
    body=[
 ("p", "Most photographers sell to whoever asks. That works until it does not, and "
       "then the question becomes who to approach &mdash; at which point the honest "
       "answer is that nobody has written the list down."),
 ("p", "So here is the list, sorted by purchase frequency rather than by budget. "
       "Frequency matters more, because a buyer who needs images monthly will "
       "eventually need yours, and a buyer with a large budget who needs images twice "
       "a decade will not."),
 ("h2", "Tier one: they buy every week"),
 ("p", "Advertising agencies, e-commerce, media and publishing, marketing departments, "
       "public relations. Image purchasing is a line in their operating budget rather "
       "than a project decision, and someone in the building already knows what a "
       "licence is."),
 ("p", "The catch is that tier one is also where stock libraries compete hardest, and "
       "where a generated image is genuinely good enough for a great deal of the "
       "work. What survives here is the specific: a real place, a real person, a "
       "documented moment. Sell provenance to tier one, not beauty."),
 ("h2", "Tier two: they buy every quarter"),
 ("p", "Property and estate agencies, health and clinics, education, travel and "
       "hospitality, food and drink, finance and insurance, technology companies, the "
       "public sector."),
 ("p", "This is the most underrated tier and, for a Norwegian archive, probably the "
       "best one to start in. Purchases are tied to a season, a launch or a report. "
       "The buyer is a marketing coordinator rather than an art director, and they "
       "would rather have one supplier who answers within a day than a marketplace "
       "with four million files."),
 ("p", "The public sector deserves its own note. Procurement is slower and the "
       "paperwork is real, but a framework agreement with a kommune is the closest "
       "thing to recurring revenue in this trade, and everyone selling into it is "
       "already issuing structured invoices."),
 ("h2", "Tier three: they buy for a project"),
 ("p", "Oil and offshore, maritime and shipping, sport and fitness, tourism boards, "
       "non-profits, book publishers, architecture practices, fashion."),
 ("p", "Infrequent, but the individual purchase is larger and often exclusive. "
       "Architecture and offshore in particular need images nobody else can produce, "
       "because the subject is theirs and access is the barrier. That is a good "
       "position to be in and a poor one to wait for &mdash; these buyers do not "
       "search, they are introduced."),
 ("h2", "Tier four: they buy small and often"),
 ("p", "Social media agencies, podcasters, independent creators, app makers, "
       "recruiters."),
 ("p", "Low value per licence and almost no negotiation. Worth serving with a "
       "published price and a checkout rather than a conversation, because the "
       "conversation costs more than the licence. Recruiters are the interesting one: "
       "employer branding is a young budget line in Norway and the images most "
       "companies use for it are visibly bought from a library."),
 ("h2", "The ten to contact first"),
 ("p", "Sorted for a small archive selling verified, Norwegian, people-at-work "
       "photography &mdash; not for a stock library:"),
 ("ol", ["Regional advertising agencies with public-sector clients",
         "Kommune communications departments",
         "Maritime and offshore operators with a communications function",
         "Health clinics and private medical groups",
         "Architecture practices with completed Norwegian projects",
         "Food producers with a provenance story of their own",
         "Universities and university colleges",
         "Tourism boards outside the obvious destinations",
         "Recruitment agencies selling employer branding",
         "Book publishers with Norwegian non-fiction lists"]),
 ("q", "Sell to the buyer who needs an answer, not to the buyer who needs an image."),
 ("h2", "What every tier is actually buying"),
 ("p", "Not the picture. Increasingly, the ability to answer a question about the "
       "picture: where it came from, who is in it, and whether anything in it was "
       "generated. Marketing teams are being asked that internally now, and most of "
       "them cannot answer it about their own asset library."),
 ("p", "That is the pitch, and it is the same pitch in all four tiers. The frame is "
       "the product. The record is the reason to buy it here."),
 ("h2", "How to approach any of them"),
 ("p", "Not with a portfolio link. With one relevant frame, the sentence explaining "
       "why it exists, and a price they can act on without a meeting. Everything in "
       "that sequence is designed to remove a reason to postpone."),
    ])

# --------------------------------------------------------------------------
add(slug="blue-hour", topic="light", date="2026-05-09", shown="9 May 2026",
    read="5 min", frame="frame-9",
    fig="Placeholder — a harbour under deep blue twilight",
    cap="BA-C1-008 · <em>Preikestolen, February, 06:47</em> · placeholder pending the verified original",
    title="How long blue hour actually lasts at 59° north",
    short="How long blue hour actually lasts at 59° north",
    desc="A computed field table of twilight length by month at 59° north, and "
         "the received wisdom it contradicts.",
    excerpt="Not shortest in winter &mdash; shortest at the equinoxes, and about forty "
            "minutes when it is. A computed field table for deciding whether the drive "
            "is worth it.",
    lead="This entry corrects something an earlier version of this journal said. The "
         "numbers below are computed rather than remembered, and they point the "
         "opposite way.",
    body=[
 ("p", "An earlier note on this site said blue hour was shortest in the depth of "
       "winter this far north. That is wrong, and it is wrong in an instructive "
       "direction, so it is worth correcting in public rather than editing quietly."),
 ("p", "Twilight length has almost nothing to do with how much daylight there is. It "
       "depends on the angle at which the sun crosses the horizon. In midwinter at "
       "high latitude the sun travels along a shallow diagonal, so it takes "
       "<em>longer</em> to sink through the twilight band, not less time. The short "
       "twilights are at the equinoxes, when the sun drops most steeply."),
 ("h2", "The table"),
 ("p", "Computed for 59° north, on the 15th of each month. Two columns, because "
       "photographers and almanacs mean different things by the phrase."),
 ("table", ("Twilight length at 59° north, in minutes",
            ["Month", "Civil twilight<br><span class=\"th-note\">sunset to sun −6°</span>",
             "Usable blue<br><span class=\"th-note\">sun −4° to −8°</span>"],
            [["January", "50", "37"], ["February", "42", "32"], ["March", "40", "31"],
             ["April", "45", "36"], ["May", "59", "53"], ["June", "85", "121"],
             ["July", "70", "71"], ["August", "49", "41"], ["September", "41", "32"],
             ["October", "41", "31"], ["November", "47", "35"], ["December", "54", "39"]])),
 ("p", "The May to July figures need reading with care. From roughly early May to "
       "early August at this latitude the sun never goes far enough below the horizon "
       "for real darkness, so the band widens and eventually stops being a discrete "
       "event at all. In June the numbers describe a long ambient dimming rather than "
       "a window you drive to."),
 ("h2", "What the numbers actually tell you"),
 ("ul", ["<strong>The shortest windows are March, September and October,</strong> at "
         "about forty minutes of civil twilight and roughly half an hour of usable "
         "blue. Those are the mornings to arrive early for.",
         "<strong>Midwinter is generous,</strong> not stingy. Fifty minutes in "
         "January, and it arrives at a civilised hour.",
         "<strong>Midsummer has no blue hour,</strong> in the sense of a window. It "
         "has a long low light instead, which is a different picture."]),
 ("q", "Thirty-one minutes in October. That is the whole margin, and half of it is spent finding the frame."),
 ("h2", "So: is the drive worth it?"),
 ("p", "Two rules come out of the table, and both are about arrival rather than "
       "technique. In the equinox months, be standing on the spot forty-five minutes "
       "before you think you need to be &mdash; the window is barely long enough to "
       "shoot in, let alone find a composition in. In the winter months you have "
       "roughly an extra ten minutes, which is enough to try a second position."),
 ("p", "The other conclusion is less comfortable. If a frame needs blue hour "
       "specifically, it needs a scouting trip in daylight first. Thirty-one minutes "
       "is not enough to make decisions in, and decisions made in a hurry are what "
       "produce the technically fine, commercially useless frame."),
 ("h2", "How these were produced"),
 ("p", "Standard solar position for the date, solved for the hour angles at which the "
       "sun's altitude reaches each threshold, converted to minutes. No refraction "
       "correction beyond the usual allowance at the horizon, and no local terrain "
       "&mdash; a hill to the west removes minutes the almanac says you have. Treat "
       "the table as the ceiling, and check the sightline on site."),
    ])

# --------------------------------------------------------------------------
add(slug="pictures-to-avoid", topic="trade", date="2026-04-21", shown="21 April 2026",
    read="6 min", frame="frame-4",
    fig="Placeholder — a familiar viewpoint in flat light",
    cap="Market notes · placeholder imagery",
    title="Seven pictures worth avoiding at launch",
    short="Seven pictures worth avoiding at launch",
    desc="Aurora over wilderness, fjord at sunset, the perfectly composed cabin. "
         "Technically fine, commercially finished.",
    excerpt="Aurora over wilderness, fjord at sunset, the perfectly composed cabin &mdash; "
            "technically fine, commercially finished.",
    lead="Seven frames that are still worth taking for yourself, and are not worth "
         "putting in a catalogue that has to earn its keep.",
    body=[
 ("p", "None of the pictures below are bad. Several of them are the reason people "
       "pick up a camera in Norway at all. They are simply finished as a commercial "
       "proposition, and putting them in a new archive spends the one thing a new "
       "archive has, which is the buyer's attention."),
 ("h2", "The seven"),
 ("ol", ["<strong>Aurora over wilderness.</strong> Enormous supply, and it is the "
         "single most convincing subject for a generator. A buyer cannot tell, and "
         "increasingly assumes.",
         "<strong>Fjord at sunset, no people.</strong> Every tourism library has "
         "hundreds. Yours will be the four hundredth good one.",
         "<strong>The perfectly composed cabin in snow.</strong> Sells a mood that is "
         "already fully served, at a price that has been falling for a decade.",
         "<strong>Reindeer at distance.</strong> Beautiful, generic, and frequently "
         "sold with unclear permissions attached to the land and the herd.",
         "<strong>The drone shot straight down.</strong> Striking once. It is now a "
         "default, and it says nothing specific about the place beneath it.",
         "<strong>The empty modern interior.</strong> Directly in competition with "
         "generated imagery, which is very good at rooms nobody is in.",
         "<strong>The staged handshake.</strong> Corporate buyers ask for it and then "
         "do not use it, because everyone can see it was arranged."]),
 ("h2", "What they have in common"),
 ("p", "Each one is beautiful in a way that does not depend on anything having "
       "happened. Remove the photographer and the picture is still available &mdash; "
       "from a library, from a competitor, or from a prompt. There is no fact in the "
       "frame that had to be true."),
 ("q", "If nothing in the picture had to happen, nothing in it is scarce."),
 ("h2", "What to photograph instead"),
 ("p", "The same places, with the thing that makes them specific left in. A named "
       "person doing work you can identify. An hour nobody drives out for. Weather "
       "that would normally send you home. A process halfway through, still messy."),
 ("p", "These are harder, slower, and less immediately attractive on a screen. They "
       "are also the frames a buyer cannot obtain from anyone else, which is the only "
       "durable commercial position available."),
 ("h2", "Keep taking them anyway"),
 ("p", "The point is not that the seven are worthless. Take them, keep them, print "
       "them. The distinction that matters is between a personal archive and a "
       "catalogue: one is a record of what you saw, the other is a shop with limited "
       "shelf space."),
 ("p", "Confusing the two is the most common mistake in a first collection, and it is "
       "not a mistake of taste. It is a mistake about what the shelf is for."),
    ])

# --------------------------------------------------------------------------
add(slug="content-credentials", topic="provenance", date="2026-04-02", shown="2 April 2026",
    read="5 min", frame="frame-5",
    fig="Placeholder — a camera menu screen",
    cap="Capture workflow · placeholder imagery",
    title="Content credentials, switched on from the first frame",
    seotitle="Content credentials from the first frame",
    short="Content credentials from the first frame",
    desc="Why provenance metadata has to be enabled in camera, and why signing a "
         "file afterwards convinces nobody who matters.",
    excerpt="Why C2PA has to be switched on in camera, and why signing a file afterwards "
            "convinces nobody who matters.",
    lead="Signing a file after the doubt arrives proves that you signed a file. It "
         "does not prove where the file came from.",
    body=[
 ("p", "Content credentials are a signed record travelling with an image: what "
       "device made it, what was done to it afterwards, and whether any step was "
       "generative. The specification behind them, C2PA, is an industry effort with "
       "camera makers, editing-software makers and news organisations behind it."),
 ("p", "The useful part is not the technology. It is the timing."),
 ("h2", "Why in camera, and not later"),
 ("p", "A credential attached at export says the file existed when you exported it. "
       "A credential written at capture says a specific device produced this image at "
       "a specific moment, and that everything since is recorded as an edit rather "
       "than an origin."),
 ("p", "The difference only shows up under challenge, which is exactly when it "
       "matters. Anyone can sign anything at any point. The question a buyer's legal "
       "team asks is not whether the file is signed &mdash; it is what the signature "
       "was attached to, and when."),
 ("q", "A signature applied after the question is asked answers a different question."),
 ("h2", "What the support actually looks like"),
 ("p", "Honest summary: partial, improving, and not yet a plan you can rely on alone."),
 ("ul", ["<strong>Cameras.</strong> A small number of bodies can sign at capture, "
         "some through firmware added after release. Check your specific body and "
         "firmware version rather than the manufacturer's press page.",
         "<strong>Editing software.</strong> Broader support for recording edits, "
         "though the credential survives some export paths and not others.",
         "<strong>Platforms.</strong> Uneven. Several strip metadata on upload, which "
         "is why the credential is the archive's record and not the buyer's proof.",
         "<strong>Everything else.</strong> Phones, older bodies, scanners: nothing. "
         "Which is most working equipment, including much of the equipment this "
         "archive uses."]),
 ("h2", "So what carries the weight in the meantime"),
 ("p", "The same three records that carried it before any of this existed: the RAW "
       "original with a checksum, filed within a day; the capture record written at "
       "the shoot; and a release signed by anyone recognisable in the frame."),
 ("p", "Content credentials are an addition to that, not a replacement for it. An "
       "archive that depends on a credential is one platform update away from having "
       "no evidence at all, and the checksum on a RAW file has never needed anyone "
       "else's cooperation."),
 ("h2", "The practical setting"),
 ("p", "If your body supports it, turn it on today and leave it on, including for the "
       "frames you are certain nobody will ever question. Provenance is only "
       "convincing when it is indiscriminate. A photographer who signs selectively has "
       "told everyone that the unsigned frames are the interesting ones."),
 ("p", "And record honestly where a frame was signed after the fact. In this archive "
       "that distinction is a field on the record, not a rounding error &mdash; "
       "because a record that quietly flatters itself is worth less than no record."),
    ])

# --------------------------------------------------------------------------
add(slug="filing-habit", topic="method", date="2026-03-15", shown="15 March 2026",
    read="7 min", frame="frame-6",
    fig="Placeholder — drive bays and labelled backups",
    cap="Archive workflow · placeholder imagery",
    title="The filing habit that makes an archive findable in nine years",
    seotitle="The filing habit that keeps an archive findable",
    short="The filing habit that makes an archive findable in nine years",
    desc="RAW archived within 24 hours, release signed within 7 days, catalogue "
         "decision within 14. Dull on purpose.",
    excerpt="RAW archived within 24 hours, release signed within 7 days, catalogue "
            "decision within 14. Dull on purpose.",
    lead="Three deadlines, none of them interesting. They are the difference between "
         "an archive and eleven terabytes you are afraid to open.",
    body=[
 ("p", "Every photographer with more than a few years behind them has the same drive "
       "somewhere: full, unsorted, and impossible to search. Not because the work was "
       "bad. Because the filing was postponed one shoot at a time, and postponement "
       "compounds faster than storage gets cheaper."),
 ("p", "Three deadlines fix most of it. They are deliberately dull, and dullness is "
       "the feature &mdash; a rule you have to think about is a rule you will skip on "
       "the evening you are tired."),
 ("h2", "Within 24 hours: the original is filed"),
 ("p", "RAW copied to the archive, checksummed, named, backed up in a second place. "
       "Not edited, not selected, not culled. Just made permanent and made findable."),
 ("p", "Twenty-four hours matters because the memory card is the most dangerous place "
       "an image can live, and because the details you will need on the record are "
       "still in your head today and will not be on Thursday."),
 ("h2", "Within 7 days: the release is signed"),
 ("p", "Anyone recognisable, signed within a week, in person where possible. This is "
       "the deadline people miss most often and regret most expensively, because a "
       "release chased six months later is a favour being asked of someone who has no "
       "reason left to say yes."),
 ("p", "A frame without a release is not a frame you own less of. It is a frame you "
       "cannot license at all, which makes the entire shoot a personal project you "
       "paid for."),
 ("h2", "Within 14 days: the catalogue decision"),
 ("p", "In, out, or hold &mdash; and hold has to have a date on it. Two weeks is long "
       "enough for the shoot to stop feeling like an achievement and short enough that "
       "you still remember the light."),
 ("p", "The decision is not about the best frames. It is the three tests: can you say "
       "where it came from, could a machine have made it, and can you name a buyer. "
       "Most shoots yield one or two that pass. That is a normal outcome, not a bad day."),
 ("q", "An archive is not a place you put files. It is a set of deadlines you keep."),
 ("h2", "The naming scheme"),
 ("p", "Boring, fixed, and never clever. Date, accession number, short slug, in one "
       "order that never varies. It will be sorted by machines for the rest of its "
       "life, and machines are unmoved by charm."),
 ("ul", ["Never rename a file after it is archived. Add fields to the record instead.",
         "Never reuse an accession number, even for a frame that was withdrawn.",
         "Never encode anything in a filename that can change &mdash; a client name, a "
         "campaign, a status.",
         "Write the extension you actually have, not the one you intend to make."]),
 ("h2", "Why nine years"),
 ("p", "Because that is roughly when the questions arrive. A buyer's legal team "
       "reviewing an asset library before a rebrand. A person in a photograph who has "
       "changed their mind. An audit of what was licensed to whom. None of those "
       "happen in the first year, and all of them are answered from the record rather "
       "than from memory."),
 ("p", "The archive you can search in nine years is not the one with the best "
       "pictures in it. It is the one where somebody kept three dull deadlines on the "
       "evenings when it would have been reasonable not to."),
    ])
