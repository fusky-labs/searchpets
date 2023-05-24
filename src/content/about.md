---
title: About | Searchpets!
---

## What is _Searchpets_?

_Searchpets!_ is an open source project as a search engine for searching comic pages, characters, and chapter arcs from
[_Housepets!_](https://www.housepetscomic.com), a webcomic series created by [Rick Griffin](https://www.rickgriffinstudios.com);
and was created by two passionate web developers from Indonesia and the Philippines, maxthecomputerfox and Kuroji Fusky.

Searchpets! was created on March 25, 2022 and finished a working prototype a month later, released as v1.

We created the project was we wanted to find an easier way to find the source comic for memes that were made from
a comic, so we did! And as aspiring and passionate web developers, we wanted to make something that we find easy to
use and help people along the way with the source code included.

## Infrastructure

When we first worked with this project, we're already planning things out when we first met; I did all of the
initial design and Max did all the backend work and used Linode to store comic data.

Currently, we use Vercel and Cloudflare to host this website; Redis to store all the comic database through
Amazon Web Services from Redis Cloud.

## Some questions

::Accordion{title="How long did this project took?"}
The initial prototype took at least a a month or two to complete, and while we add some features here and there and work on as we progress, but due to sloppy code from our website codebase, we had to rewrite the entire website from scratch.

With the total rewrite of the site, integrating the Housepets Redis database to the site, a bunch of errors, issues, bugs, and with Max having school during weekdays - the process took several months to be finished.
::

::Accordion{title="What was Searchpets! written in?"}
Searchpets! is written in a web framework called Next.js, built on top of React, one of the popular JavaScript frameworks for building websites.
We use Python to write scripts update the latest comics from the official website via web scraping method - and Redis as the our main database and its search functionality for SP. However, noting that Rick himself will be closing Housepets for good, we would shut our updater scripts for it's last comic updates.
::

::Accordion{title="Does this site contain ads?"}
Nope, not a single one!

We never have the incentive to have any monetary gains on this site nor embed any kind of advertising or conversions whatsoever, although we've previously used Google Analytics to monitor and track user behavior (i.e. page scrolls, page views, etc.), we currently use Microsoft Clarity and Vercel Analytics for analytics, but regardless, Searchpets will, and always be a free and open source project publicly available for everyone to use, including its source code!
::

::Accordion{title="Wouldn't Rick take SP down?"}
I'm pretty sure Rick wouldn't mind at all, but we actually have considered about copyright infringement throughout development since the images are sourced directly from the official website and with his name and the URL of the website on each comic strip. I think it shouldn't be a problem since it's all under Fair Use.
::
