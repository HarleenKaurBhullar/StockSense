import "./Deliveries.css";

function Deliveries() {
  return (
    <div className="deliveries-page">

      {/* Background effects */}
      <div className="deliveries-glow deliveries-glow-one"></div>
      <div className="deliveries-glow deliveries-glow-two"></div>


      <main className="deliveries-content">


        {/* Header */}
        <div className="deliveries-header">

          <div>

            <span className="deliveries-eyebrow">
              INVENTORY OPERATIONS
            </span>


            <h1>
              Deliveries
            </h1>


            <p>
              Manage outgoing inventory and delivery orders.
            </p>

          </div>



          <button className="new-delivery-button">

            <span>
              +
            </span>

            New Delivery

          </button>


        </div>





        {/* Delivery Card */}

        <section className="delivery-card">


          {/* Toolbar */}

          <div className="delivery-toolbar">


            <div>

              <h2>
                Delivery Orders
              </h2>


              <p>
                Track outgoing inventory movements and delivery status.
              </p>


            </div>



            <div className="delivery-search">

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

          <div className="delivery-filters">


            <select defaultValue="all">

              <option value="all">
                All Status
              </option>

            </select>



          </div>





          {/* Table */}

          <div className="delivery-table-wrapper">


            <table>

              <thead>

                <tr>

                  <th>
                    REFERENCE
                  </th>


                  <th>
                    FROM
                  </th>


                  <th>
                    TO
                  </th>


                  <th>
                    CONTACT
                  </th>


                  <th>
                    SCHEDULE DATE
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





            {/* Empty state */}

            <div className="delivery-empty">


              <div className="delivery-empty-icon">
                ↑
              </div>


              <h3>
                No delivery orders
              </h3>


              <p>
                Delivery records will appear here once connected to the backend.
              </p>


            </div>


          </div>



        </section>


      </main>


    </div>
  );
}


export default Deliveries;