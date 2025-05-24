import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";

interface DatatableProps {
  data: any[];
}

const Datatable: React.FC<DatatableProps> = ({ data }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "college_name",
    "degree"
  ]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const columnOptions = [
    { label: "Name", value: "name" },
    { label: "College", value: "college_name" },
    { label: "Degree", value: "degree" },
    { label: "Grad Year", value: "graduation_year" },
    { label: "Experience", value: "years_of_experience" },
    { label: "Companies", value: "companies_worked_at" },
    { label: "Role", value: "designation" },
    { label: "Skills", value: "skills" },
    { label: "Location", value: "location" },
    { label: "Email", value: "email_address" },
  ];

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-column md:flex-row md:justify-content-between gap-3 mb-3">
        <div className="w-full md:w-6">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Search resumes..."
              className="w-full"
            />
          </span>
        </div>
        
        <div className="w-full md:w-6">
          <MultiSelect
            value={selectedColumns}
            options={columnOptions}
            onChange={(e) => setSelectedColumns(e.value)}
            placeholder="Select columns to display"
            display="chip"
            className="w-full"
            maxSelectedLabels={2}
            showSelectAll={false}
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  // Dynamic column configuration
  const getColumnConfig = (field: string) => {
    const config: any = {
      field,
      header: columnOptions.find(opt => opt.value === field)?.label || field,
      sortable: true,
      filter: true,
    };

    // Set different min-widths based on column
    switch(field) {
      case 'name':
      case 'college_name':
        config.style = { minWidth: '180px' };
        break;
      case 'degree':
      case 'designation':
        config.style = { minWidth: '150px' };
        break;
      case 'skills':
        config.style = { minWidth: '200px' };
        break;
      case 'email_address':
        config.style = { minWidth: '220px' };
        break;
      default:
        config.style = { minWidth: '120px' };
    }

    return config;
  };

  return (
    <div className="card p-fluid" style={{ overflowX: 'auto' }}>
      {header}

      <DataTable
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        scrollable
        scrollHeight="flex"
        stripedRows
        globalFilter={globalFilter}
        responsiveLayout="stack"
        emptyMessage="No resume data available"
        className="p-datatable-sm"
        size="small"
      >
        {selectedColumns.map(field => (
          <Column key={field} {...getColumnConfig(field)} />
        ))}
      </DataTable>
    </div>
  );
};

export default Datatable;