# Tách ảnh không gian 3D từ PDF -> app-demo/public/images/spaces
# Ưu tiên pdf2image (cần poppler); nếu thiếu poppler -> fallback PyMuPDF (fitz).
# Tối ưu token: chỉ render & lưu file, KHÔNG in nội dung ảnh.
import pathlib, sys

SRC = pathlib.Path(r"F:\Codex\Yvien Hotlink Website\Z-NeededUpdate")
OUT = pathlib.Path(r"F:\Codex\Yvien Hotlink Website\app-demo\public\images\spaces")
OUT.mkdir(parents=True, exist_ok=True)

PDFS = [
    ("tang-1", SRC / "2606015_3D SPA TRI LIEU CHI THAO TANG 1.pdf"),
    ("tang-2345", SRC / "2606013_3D SPA TRI LIEU CHI THAO TANG 02,03,04,05.pdf"),
]

ZOOM = 2.0  # ~144 dpi

def via_pdf2image():
    from pdf2image import convert_from_path
    for prefix, pdf in PDFS:
        if not pdf.exists():
            print("MISSING", pdf.name); continue
        pages = convert_from_path(str(pdf), dpi=int(72 * ZOOM), fmt="jpeg")
        for i, img in enumerate(pages, 1):
            fp = OUT / f"{prefix}-p{i:02d}.jpg"
            img.save(fp, "JPEG", quality=82)
            print("SAVED", fp.name, fp.stat().st_size // 1024, "KB")

def via_fitz():
    import fitz
    mat = fitz.Matrix(ZOOM, ZOOM)
    for prefix, pdf in PDFS:
        if not pdf.exists():
            print("MISSING", pdf.name); continue
        doc = fitz.open(str(pdf))
        print(f"{pdf.name}: {doc.page_count} trang")
        for i in range(doc.page_count):
            pix = doc.load_page(i).get_pixmap(matrix=mat)
            fp = OUT / f"{prefix}-p{i+1:02d}.jpg"
            fp.write_bytes(pix.tobytes("jpeg", jpg_quality=82))
            print("SAVED", fp.name, fp.stat().st_size // 1024, "KB")
        doc.close()

try:
    via_pdf2image()
    print("ENGINE: pdf2image")
except Exception as e:
    print("pdf2image fail (", type(e).__name__, ") -> fallback fitz")
    via_fitz()
    print("ENGINE: PyMuPDF")
print("DONE ->", OUT)
