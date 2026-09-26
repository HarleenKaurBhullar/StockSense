import "./MoveHistory.css";

function MoveHistory() {
  return (
    <div className="move-page">

      {/* Background effects */}
      <div className="move-glow move-glow-one"></div>
      <div className="move-glow move-glow-two"></div>


      <main className="move-content">


        {/* Header */}
        <div className="move-header">

          <div>

            <span className="move-eyebrow">
              INVENTORY OPERATIONS
            </span>

            <h1>
              Move History
            </h1>

            <p>
              Track all inventory movements between locations.
            </p>

          </div>


          <button className="new-move-button">

            <span>
              +
            </span>

            New Move

          </button>

        </div>





        {/* Main Card */}
        <section className="move-card">


          {/* Toolbar */}
          <div className="move-toolbar">


            <div>

              <h2>
                Inventory Moves
              </h2>

              <p>
                View stock transfers and movement records.
              </p>

            </div>



            <div className="move-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search by reference or contact..."
              />

            </div>


          </div>





          {/* Filters */}
          <div className="move-filters">


            <select defaultValue="all">

              <option value="all">
                All Status
              </option>

            </select>



            <select defaultValue="all">

              <option value="all">
                All Locations
              </option>

            </select>


          </div>






          {/* Table */}

          <div className="move-table-wrapper">


            <table>

              <thead>

                <tr>

                  <th>
                    REFERENCE
                  </th>

                  <th>
                    DATE
                  </th>

                  <th>
                    CONTACT
                  </th>

                  <th>
                    FROM
                  </th>

                  <th>
                    TO
                  </th>

                  <th>
                    PRODUCT
                  </th>

                  <th>
                    QUANTITY
                  </th>

                  <th>
                    STATUS
                  </th>


                </tr>

              </thead>



              {/* Backend will populate */}

              <tbody>

              </tbody>


            </table>





            {/* Empty State */}

            <div className="move-empty">


              <div className="move-empty-icon">
                ↔
              </div>


              <h3>
                No move records
              </h3>


              <p>
                Movement records will appear here once connected to the backend.
              </p>


            </div>


          </div>



        </section>



      </main>


    </div>
  );
}


export default MoveHistory;