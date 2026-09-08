import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Star Battle Online',
  description: 'Privacy Policy for Star Battle Online. Details on data handling, cookies, and Google AdSense compliance.',
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 prose dark:prose-invert text-zinc-700 dark:text-zinc-300">
      <h1>Privacy Policy</h1>
      <p className="text-xs text-zinc-400">Last updated: September 9, 2026</p>

      <h2>1. Overview</h2>
      <p>
        At Star Battle Online (accessible from https://starbattleonline.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by Star Battle Online and how we use it.
      </p>

      <h2>2. Information We Do Not Collect</h2>
      <p>
        Star Battle Online is designed to be played immediately without an account. We do not require you to register, log in, or provide personal identifiable information such as your name, phone number, or physical address.
      </p>

      <h2>3. Cookies and Local Storage</h2>
      <p>
        We use browser LocalStorage strictly to preserve your offline puzzle progress, such as your current streak, completion times, and board state. This data resides on your device and is not transmitted to external tracking servers.
      </p>

      <h2>4. Google AdSense & Third-Party Cookies</h2>
      <p>
        Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at{' '}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          https://policies.google.com/technologies/ads
        </a>.
      </p>

      <h2>5. Log Files</h2>
      <p>
        Like most web platforms, Star Battle Online follows a standard procedure of using log files provided by infrastructure providers (such as Vercel and Cloudflare). These files log visitors when they visit websites. The information collected includes IP addresses, browser type, ISP, date and time stamp, referring/exit pages, and click counts. These are not linked to any personally identifiable information.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at{' '}
        <a href="mailto:support@starbattleonline.com">support@starbattleonline.com</a>.
      </p>
    </article>
  );
}
