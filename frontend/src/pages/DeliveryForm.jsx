import "./DeliveryForm.css";

function DeliveryForm() {
  return (
    <div className="delivery-form-page">

      {/* Background effects */}
      <div className="delivery-form-glow delivery-form-glow-one"></div>
      <div className="delivery-form-glow delivery-form-glow-two"></div>


      <main className="delivery-form-content">


        {/* Top Action + Status */}

        <div className="delivery-form-top">


          <div className="delivery-actions">

            <button className="validate-button">
              Validate
            </button>


            <button className="secondary-action">
              Print
            </button>


            <button className="secondary-action">
              Cancel
            </button>

          </div>





          <div className="delivery-status">

            <div className="status-step active">
              Draft
            </div>

            <span>
              →
            </span>

            <div className="status-step">
              Waiting
            </div>

            <span>
              →
            </span>

            <div className="status-step">
              Ready
            </div>

            <span>
              →
            </span>

            <div className="status-step">
              Done
            </div>

          </div>


        </div>





        {/* Main Information */}

        <section className="delivery-info-card">


          <div className="section-title">

            <h2>
              Delivery Information
            </h2>

            <p>
              Configure delivery details and operation settings.
            </p>

          </div>





          <div className="form-grid">


            <div className="form-field">

              <label>
                Warehouse
              </label>

              <select defaultValue="">

                <option value="">
                  Select warehouse
                </option>

              </select>

            </div>





            <div className="form-field">

              <label>
                Operation Type
              </label>

              <select defaultValue="">

                <option value="">
                  Select operation type
                </option>

              </select>

            </div>





            <div className="form-field">

              <label>
                Delivery Address
              </label>

              <input
                type="text"
                placeholder="Enter delivery address"
              />

            </div>





            <div className="form-field">

              <label>
                Scheduled Date
              </label>

              <input
                type="date"
              />

            </div>





            <div className="form-field">

              <label>
                Responsible
              </label>

              <input
                type="text"
                placeholder="Assign responsible person"
              />

            </div>



          </div>



        </section>








        {/* Products */}

        <section className="products-card">


          <div className="products-header">


            <div>

              <h2>
                Products
              </h2>


              <p>
                Add products required for this delivery.
              </p>

            </div>



            <button className="add-product-button">

              <span>
                +
              </span>

              Add New Product

            </button>


          </div>






          {/* Product Form */}

          <div className="product-entry">


            <div className="form-field">

              <label>
                Product
              </label>

              <select defaultValue="">

                <option value="">
                  Select product
                </option>

              </select>

            </div>





            <div className="form-field">

              <label>
                Quantity
              </label>

              <input
                type="number"
                placeholder="Enter quantity"
              />

            </div>





            <div className="form-field">

              <label>
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter destination"
              />

            </div>





            {/* Backend stock validation */}

            <div className="stock-alert">

              ⚠ Stock availability alert will appear here.

            </div>


          </div>



        </section>



      </main>


    </div>
  );
}


export default DeliveryForm;