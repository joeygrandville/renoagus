import { Grid, TablePagination, withStyles } from "@material-ui/core";
import {
  Add,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import MTable, { MTableAction, MTableToolbar } from "material-table";
import React, { createRef, forwardRef } from "react";

const icons = {
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const localization = {
  body: {
    emptyDataSourceMessage: "No hay datos para mostrar",
    addTooltip: "Nuevo",
    deleteTooltip: "Eliminar",
    editTooltip: "Editar",
    filterRow: { filterPlaceHolder: "", filterTooltip: "Filtro" },
    editRow: { deleteText: "¿Está seguro de editar este registro", cancelTooltip: "Cancelar", saveTooltip: "Guardar" },
  },
  grouping: { placeholder: "Arrastrar encabezados ...", groupedBy: "Agrupado por:" },
  header: { actions: "" },
  pagination: {
    labelDisplayedRows: "{from}-{to} de {count}",
    labelRowsSelect: "filas",
    labelRowsPerPage: "Filas por página:",
    firstAriaLabel: "Primera Página",
    firstTooltip: "Primera Página",
    previousAriaLabel: "Página Anterior",
    previousTooltip: "Página Anterior",
    nextAriaLabel: "Próxima Página",
    nextTooltip: "Próxima Página",
    lastAriaLabel: "Última Página",
    lastTooltip: "Última Página",
  },
  toolbar: {
    addRemoveColumns: "Agregar o Quitar Columnas",
    nRowsSelected: "{0} fila(s) seleccionada(s)",
    showColumnsTitle: "Mostrar Columnas",
    showColumnsAriaLabel: "Mostrar Columnas",
    exportTitle: "Exportar",
    exportAriaLabel: "Exportar",
    exportName: "Exportar como CSV",
    searchTooltip: "Buscar",
    searchPlaceholder: "Buscar",
  },
};

const StyledToolbar = withStyles(
  (t) => {
    return {
      root: { paddingRight: 0, overflow: "hidden" },
      title: {
        flexGrow: 1,
        [t.breakpoints.up("sm")]: { marginLeft: -24 },
        [t.breakpoints.down("xs")]: { marginLeft: -16 },
        "& .MuiTypography-h6": { fontSize: "1rem", fontWeight: 500 },
      },
      actions: { color: "inherit", "& > div > div > span": { paddingLeft: 4, "& > *:not(:first-child)": { marginLeft: 4 } } },
      spacer: { display: "none" },
    };
  },
  { name: "MTableToolbar" }
)(MTableToolbar);

const MaterialTable = ({
  onRowAdd,
  onRowDelete,
  onRowUpdate,
  hideToolbar,
  hidePaging,
  exportButton,
  options,
  editable,
  clrEditable,
  components,
  ...other
}) => {
  const tprops = {
    options: {
      paging: !hidePaging,
      toolbar: !hideToolbar,
      exportButton: Boolean(!hideToolbar && exportButton),
      actionsColumnIndex: -1,
      showTitle: !!other.title,
      //actionsCellStyle: { color: "red" },
      ...(options || {}),
    },
    tableRef: createRef(),
    icons,
    localization,
    components: {
      Pagination: (props) => (!hidePaging ? <TablePagination {...props} /> : <></>),
      Toolbar: StyledToolbar,
      Container: ({ children }) => children,
      Action: (props) => {
        const { action, data } = props;
        const { custom, icon: Icon, onClick } = typeof action?.action === "function" ? action.action(props) : action;
        if (custom) return <Icon onClick={typeof onClick === "function" ? (event) => onClick(data, event) : undefined} />;
        return <MTableAction {...props} size="small" />;
      },
      ...(components || {}),
    },
    editable: {
      ...(clrEditable
        ? {}
        : {
            isEditable: (r) => typeof onRowUpdate === "function" && r.editable !== false,
            isDeletable: (r) => typeof onRowDelete === "function" && r.editable !== false,
            onRowAdd,
            onRowUpdate,
            onRowDelete,
          }),
      ...(editable || {}),
    },
    ...other,
  };
  return <MTable {...tprops} />;
};

export default MaterialTable;
