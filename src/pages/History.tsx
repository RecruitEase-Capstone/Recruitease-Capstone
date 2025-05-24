import React, { useEffect, useState } from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { API_BASE_URL } from "../components/Api";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const History: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "college_name",
    "degree",
    "graduation_year",
    "years_of_experience",
    "companies_worked_at",
    "designation",
    "skills",
    "location",
    "email_address",
  ]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const columnOptions = [
    { label: "Name", value: "name" },
    { label: "College Name", value: "college_name" },
    { label: "Degree", value: "degree" },
    { label: "Graduation Year", value: "graduation_year" },
    { label: "Years of Experience", value: "years_of_experience" },
    { label: "Companies Worked At", value: "companies_worked_at" },
    { label: "Designation", value: "designation" },
    { label: "Skills", value: "skills" },
    { label: "Location", value: "location" },
    { label: "Email Address", value: "email_address" },
  ];

  // Helper function to format array fields into strings
  const formatArrayField = (field: any) => {
    if (field === null) return "-";
    if (Array.isArray(field)) {
      return field.filter(item => item && item.trim() !== "").join(", ");
    }
    return field || "-";
  };

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const url = `${API_BASE_URL}/api/cv/summarize`;
        const token = localStorage.getItem("token");

        const res = await fetch("/api/cv/history", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        
        // Transform the data to format array fields
        const formattedData = json.obj.map((item: any) => ({
          ...item,
          name: formatArrayField(item.name),
          college_name: formatArrayField(item.college_name),
          degree: formatArrayField(item.degree),
          companies_worked_at: formatArrayField(item.companies_worked_at),
          designation: formatArrayField(item.designation),
          skills: formatArrayField(item.skills),
          location: formatArrayField(item.location),
          email_address: formatArrayField(item.email_address),
        }));
        
        setData(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, []);

  const handleGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <Container fluid className="py-4">
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h4 style={{ fontWeight: "bold" }}>History</h4>
            </Col>
            <Col xs={12} lg="auto" className="mb-2 mb-lg-0">
              <div style={{ position: 'relative' }}>
                <MultiSelect
                  value={selectedColumns}
                  options={columnOptions}
                  onChange={(e) => setSelectedColumns(e.value)}
                  placeholder="Select Columns"
                  display="chip"
                  className="w-100"
                  style={{ 
                    minWidth: '250px',
                    maxWidth: '100%'
                  }}
                  panelStyle={{ maxWidth: '400px' }}
                />
                <style >{`
                  .p-multiselect-token {
                    max-width: 150px !important;
                    margin: 2px !important;
                  }
                  .p-multiselect-token-label {
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    max-width: 100px !important;
                  }
                  .p-multiselect-chips {
                    flex-wrap: wrap !important;
                    max-height: 80px !important;
                    overflow-y: auto !important;
                  }
                  .p-multiselect.p-multiselect-chip {
                    min-height: 45px !important;
                  }
                  @media (max-width: 768px) {
                    .p-multiselect {
                      width: 100% !important;
                    }
                  }
                `}</style>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <div className="d-flex align-items-center">
                <span className="me-2">Search:</span>
                <InputText
                  value={globalFilter}
                  onChange={handleGlobalFilterChange}
                  placeholder="Search globally"
                  className="flex-grow-1"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </Col>
          </Row>

          {/* Updated CSS for MultiSelect chip wrapping and Table Borders */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .p-multiselect-token {
                max-width: 150px;
                margin: 2px;
                display: inline-block;
              }
              .p-multiselect-token-label {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 100px;
                display: inline-block;
              }
              .p-multiselect-chips {
                flex-wrap: wrap;
                max-height: 80px;
                overflow-y: auto;
                gap: 2px;
              }
              .p-multiselect.p-multiselect-chip .p-multiselect-label {
                min-height: 45px;
                display: flex;
                align-items: flex-start;
                padding-top: 8px;
              }
              
              /* Table Border Styles - Thicker Borders */
              .p-datatable .p-datatable-thead > tr > th {
                border: 2px solid #000000 !important;
                border-bottom: 3px solid #dee2e6 !important;
                background-color: #f8f9fa !important;
              }
              
              .p-datatable .p-datatable-tbody > tr > td {
                border: 2px solid #000000 !important;
                border-top: none !important;
              }
              
              .p-datatable .p-datatable-tbody > tr:first-child > td {
                border-top: 2px solid #dee2e6 !important;
              }
              
              .p-datatable .p-datatable-tbody > tr:hover {
                background-color: #f5f5f5 !important;
              }
              
              .p-datatable .p-datatable-tbody > tr:nth-child(even) {
                background-color: #f9f9f9 !important;
              }
              
              .p-datatable .p-datatable-tbody > tr:nth-child(even):hover {
                background-color: #f0f0f0 !important;
              }
              
              /* Additional border styling for better visibility */
              .p-datatable table {
                border-collapse: collapse !important;
                border: 2px solid #dee2e6 !important;
              }
              
              @media (max-width: 768px) {
                .p-multiselect {
                  width: 100% !important;
                  min-width: unset !important;
                }
                .table-responsive {
                  font-size: 0.875rem;
                }
              }
            `
          }} />

          {/* Responsive Table Container */}
          <div className="table-responsive" style={{ 
            overflowX: "auto",
            maxHeight: "70vh",
            border: "1px solid #dee2e6",
            borderRadius: "0.375rem"
          }}>
            <DataTable
              value={data}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ 
                minWidth: selectedColumns.length > 6 ? "80rem" : "60rem",
                width: "100%"
              }}
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
              scrollable
              scrollHeight="400px"
              stripedRows
              globalFilter={globalFilter}
              filters={{ global: { value: globalFilter, matchMode: "contains" } }}
              loading={loading}
              emptyMessage="No records found."
              dataKey="id"
              responsiveLayout="scroll"
              resizableColumns
              columnResizeMode="expand"
            >
              {selectedColumns.includes("name") && (
                <Column 
                  field="name" 
                  header="Name" 
                  sortable 
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.name)}
                    </div>
                  )}
                  style={{ minWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("college_name") && (
                <Column 
                  field="college_name" 
                  header="College" 
                  sortable 
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.college_name)}
                    </div>
                  )}
                  style={{ minWidth: '120px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("degree") && (
                <Column 
                  field="degree" 
                  header="Degree" 
                  sortable 
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.degree)}
                    </div>
                  )}
                  style={{ minWidth: '120px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("graduation_year") && (
                <Column
                  field="graduation_year"
                  header="Grad Year"
                  sortable
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.graduation_year)}
                    </div>
                  )}
                  style={{ minWidth: '80px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("years_of_experience") && (
                <Column
                  field="years_of_experience"
                  header="Experience"
                  sortable
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.years_of_experience)}
                    </div>
                  )}
                  style={{ minWidth: '80px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("companies_worked_at") && (
                <Column
                  field="companies_worked_at"
                  header="Companies"
                  sortable
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.companies_worked_at)}
                    </div>
                  )}
                  style={{ minWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("designation") && (
                <Column
                  field="designation"
                  header="Designation"
                  sortable
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.designation)}
                    </div>
                  )}
                  style={{ minWidth: '120px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("skills") && (
                <Column 
                  field="skills" 
                  header="Skills" 
                  sortable 
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.skills)}
                    </div>
                  )}
                  style={{ minWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("location") && (
                <Column 
                  field="location" 
                  header="Location" 
                  sortable 
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.location)}
                    </div>
                  )}
                  style={{ minWidth: '100px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("email_address") && (
                <Column 
                  field="email_address" 
                  header="Email" 
                  sortable 
                  body={(rowData) => (
                    <div style={{ 
                      wordBreak: 'break-all',
                      whiteSpace: 'normal'
                    }}>
                      {formatArrayField(rowData.email_address)}
                    </div>
                  )}
                  style={{ minWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
            </DataTable>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default History;