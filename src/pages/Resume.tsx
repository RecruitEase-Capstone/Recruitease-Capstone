import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useResume } from "../context/ResumeContext";

const Resume: React.FC = () => {
  const { resumeData } = useResume();
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>([
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
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

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

  const handleGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <Container fluid className="py-4">
          {/* Header dan Filter Kolom */}
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h4 style={{ fontWeight: "bold" }}>Resume Summary</h4>
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
              </div>
            </Col>
          </Row>

          {/* Search */}
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

          {/* Enhanced CSS for MultiSelect chip wrapping and responsive design */}
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
              
              /* Mobile Responsive Enhancements */
              @media (max-width: 768px) {
                .p-multiselect {
                  width: 100% !important;
                  min-width: unset !important;
                }
                .table-responsive {
                  font-size: 0.875rem;
                }
                
                /* Mobile DataTable adjustments */
                .p-datatable .p-datatable-thead > tr > th {
                  padding: 0.5rem 0.25rem !important;
                  font-size: 0.8rem !important;
                }
                .p-datatable .p-datatable-tbody > tr > td {
                  padding: 0.5rem 0.25rem !important;
                  font-size: 0.75rem !important;
                }
                
                /* Adjust column widths for mobile */
                .p-datatable .p-datatable-thead > tr > th,
                .p-datatable .p-datatable-tbody > tr > td {
                  min-width: 100px !important;
                }
                
                /* Pagination adjustments */
                .p-paginator {
                  padding: 0.5rem !important;
                }
                .p-paginator .p-paginator-pages .p-paginator-page {
                  min-width: 2rem !important;
                  height: 2rem !important;
                  font-size: 0.75rem !important;
                }
              }
              
              @media (max-width: 576px) {
                .table-responsive {
                  font-size: 0.75rem;
                }
                
                /* Extra small mobile adjustments */
                .p-datatable .p-datatable-thead > tr > th {
                  padding: 0.25rem 0.125rem !important;
                  font-size: 0.7rem !important;
                }
                .p-datatable .p-datatable-tbody > tr > td {
                  padding: 0.25rem 0.125rem !important;
                  font-size: 0.65rem !important;
                }
                
                .p-datatable .p-datatable-thead > tr > th,
                .p-datatable .p-datatable-tbody > tr > td {
                  min-width: 80px !important;
                }
                
                /* Hide some pagination elements on very small screens */
                .p-paginator .p-paginator-first,
                .p-paginator .p-paginator-last {
                  display: none !important;
                }
              }
            `
          }} />

          {/* Responsive Table Container with enhanced mobile support */}
          <div className="table-responsive" style={{ 
            overflowX: "auto",
            maxHeight: "70vh",
            border: "1px solid #dee2e6",
            borderRadius: "0.375rem"
          }}>
            <DataTable
              value={resumeData ?? []}
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
              loading={!resumeData}
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
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.name)
                        ? row.name.join(", ")
                        : row.name ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '120px', maxWidth: '200px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("college_name") && (
                <Column
                  field="college_name"
                  header="College"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.college_name)
                        ? row.college_name.join(", ")
                        : row.college_name ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '100px', maxWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("degree") && (
                <Column
                  field="degree"
                  header="Degree"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.degree)
                        ? row.degree.join(", ")
                        : row.degree ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '100px', maxWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("graduation_year") && (
                <Column
                  field="graduation_year"
                  header="Grad Year"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {row.graduation_year ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '80px', maxWidth: '100px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("years_of_experience") && (
                <Column
                  field="years_of_experience"
                  header="Exp"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}>
                      {row.years_of_experience ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '60px', maxWidth: '80px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("companies_worked_at") && (
                <Column
                  field="companies_worked_at"
                  header="Companies"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.companies_worked_at)
                        ? row.companies_worked_at.join(", ")
                        : row.companies_worked_at ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '120px', maxWidth: '200px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("designation") && (
                <Column
                  field="designation"
                  header="Position"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.designation)
                        ? row.designation.join(", ")
                        : row.designation ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '100px', maxWidth: '150px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("skills") && (
                <Column
                  field="skills"
                  header="Skills"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.skills)
                        ? row.skills.join(", ")
                        : row.skills ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '120px', maxWidth: '200px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("location") && (
                <Column
                  field="location"
                  header="Location"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '100px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.location)
                        ? row.location.join(", ")
                        : row.location ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '80px', maxWidth: '120px' }}
                  headerStyle={{ whiteSpace: 'nowrap' }}
                />
              )}
              {selectedColumns.includes("email_address") && (
                <Column
                  field="email_address"
                  header="Email"
                  sortable
                  filter
                  body={(row) => (
                    <div style={{ 
                      wordBreak: 'break-all',
                      whiteSpace: 'normal',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {Array.isArray(row.email_address)
                        ? row.email_address.join(", ")
                        : row.email_address ?? "-"}
                    </div>
                  )}
                  style={{ minWidth: '120px', maxWidth: '180px' }}
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

export default Resume;
