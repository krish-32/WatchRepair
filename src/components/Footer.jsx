const Footer = () => (
  <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-red-50 to-rose-100 py-6 border-t border-rose-200">
    <div className="max-w-6xl mx-auto px-4 text-center text-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-rose-600">Yuva Times</span> — All
        rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
