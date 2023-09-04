export const PDFLayout = () => {
  return <div className="h-screen w-full overflow-hidden">
    <iframe src="https://app.useanvil.com/api/etch/verify/aPo6or8dQUrTQQ8ZiyAm?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduZXJJZCI6NTMwNzYyLCJjbGllbnRVc2VySWQiOiJ0ZXN0LXVzZXItaWQiLCJjcmVhdGVkQXQiOjE2OTMwNzIzMjQ1ODMsImV4dHJhIjoiZEVEMyIsImlhdCI6MTY5MzA3MjMyNCwiZXhwIjoxNjkzMTU4NzI0fQ.NlVCQ1gLr16qpcHqHcgR6XbIfKBkjCKbDKViMnOvYfQ"
      style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
    />
  </div>;
};