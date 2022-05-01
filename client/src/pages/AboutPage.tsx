export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">About</h1>
      <p>
        Artsy is an image sharing website, where users can create accounts and
        upload images. Users can also add comments and favorites to uploaded
        content. Clicking on a user&apos;s name will take you to their artist
        profile, which contains the posts they&apos;ve created and favorited.
      </p>
      <p>
        To get started, click on the{' '}
        <span className="text-indigo-400">Browse</span> tab to see what artwork,
        photographs, and other content users are uploading. Or, if you&apos;re
        logged in, click on your avatar and the{' '}
        <span className="text-indigo-400">Upload</span> tab to create a new
        post.
      </p>
    </div>
  );
}
