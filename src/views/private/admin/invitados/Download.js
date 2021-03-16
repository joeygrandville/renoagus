import { write as xlsx_write, utils as xlsx_utils } from "xlsx";
import { useFbContext } from "../../../../firebase/context";

const useDownload = () => {
  const {
    store,
    store: { estados, invitados, paths, menus },
  } = useFbContext();

  const find = (arr, path, id) => (Array.isArray(arr) && (arr.find((a) => a.id === id) || {})[path]) || "";
  const quoteIfComma = (txt) => (String(txt || "").indexOf(";") >= 0 ? `"${txt}"` : String(txt || "").replace(/"/g, '""'));

  const getContent = (excel) => {
    if (excel) {
      const fitToColumn = (data) => data[0].map((_a, i) => ({ wch: Math.max(...data.map((a) => a[i].toString().length)) }));
      const ps = paths.filter((p) => p.active);
      const data = invitados.reduce(
        (a, i) => [
          ...a,
          ps.reduce((ap, p) => {
            const [type, source, sPath] = (p?.type || "").split(":");
            if (!type && p.name === "link") return [...ap, `${window.location.origin}?rsvp=${i.id}#confirmation`];
            switch (type) {
              case "select":
                return [...ap, quoteIfComma(find(store[source], sPath, i[p.name]))];
              default:
                return [...ap, quoteIfComma(i[p.name])];
            }
          }, []),
        ],
        [ps.reduce((a, p) => [...a, p.path], [])]
      );

      const wb = xlsx_utils.book_new();
      const ws = xlsx_utils.aoa_to_sheet(data);
      ws["!cols"] = fitToColumn(data);
      ws["!autofilter"] = { ref: "A1:I1" };
      xlsx_utils.book_append_sheet(wb, ws, "Invitados");
      const wbout = xlsx_write(wb, { bookType: "xlsx", bookSST: false, type: "array" });
      return { blob: new Blob([wbout], { type: "application/octet-stream" }), ext: "xlsx" };
    }
    return {
      blob: new Blob(
        [
          JSON.stringify(
            {
              estados: estados.reduce((a, { id, ...e }) => ({ ...a, [id]: { ...e } }), {}),
              invitados: invitados.reduce((a, { id, ...i }) => ({ ...a, [id]: { ...i } }), {}),
            },
            "",
            2
          ),
        ],
        { type: "text/plain" }
      ),
      ext: "json",
    };
  };

  const handleDownload = (excel) => () => {
    const { blob, ext } = getContent(excel);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `invitados.${ext}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };
  return { handleDownload };
};

export default useDownload;
