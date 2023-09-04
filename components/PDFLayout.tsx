export const PDFLayout = () => {
  return <div className="h-screen w-full overflow-hidden">
    <iframe src="this_will_be_your_pdf_url"
      style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
    />
  </div>;
};