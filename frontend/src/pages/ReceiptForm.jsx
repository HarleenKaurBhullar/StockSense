import { useState } from "react";
import "./ReceiptForm.css";

function ReceiptForm() {
  const [products, setProducts] = useState([
    {
      id: Date.now(),
      product: "",
      quantity: "",
    },
  ]);

  const addProduct = () => {
    setProducts((currentProducts) => [
      ...currentProducts,
      {
        id: Date.now() + Math.random(),
        product: "",
        quantity: "",
      },
    ]);
  };

  const removeProduct = (id) => {
    setProducts((currentProducts) => {
      if (currentProducts.length === 1) {
        return currentProducts;
      }

      return currentProducts.filter((item) => item.id !== id);
    });
  };

  const updateProduct = (id, field, value) => {
    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend integration will be connected later.
    // POST /api/receipts
  };

  return (
    <div className="receipt-form-page">
      <div className="receipt-form-glow receipt-form-glow-one"></div>
      <div className="receipt-form-glow receipt-form-glow-two"></div>

      <main className="receipt-form-content">
        {/* PAGE HEADER */}
        <div className="receipt-form-header">
          <div>
            <span className="receipt-form-eyebrow">
              OPERATIONS / RECEIPTS
            </span>

            <h1>New Receipt</h1>

            <p>
              Create an incoming inventory receipt and add the products being
              received.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* RECEIPT INFORMATION */}
          <section className="receipt-form-card">
            <div className="receipt-section-header">
              <div className="receipt-heading">
                <span className="receipt-section-eyebrow">
                  RECEIPT DETAILS
                </span>

                <h2>Receipt Information</h2>

                <p>
                  Enter the basic information for this receipt.
                </p>
              </div>
            </div>

            <div className="receipt-details-grid">
              {/* REFERENCE */}
              <div className="receipt-field">
                <label htmlFor="receipt-reference">
                  Reference
                </label>

                <input
                  id="receipt-reference"
                  type="text"
                  placeholder="Enter receipt reference"
                />
              </div>

              {/* RESPONSIBLE */}
              <div className="receipt-field">
                <label htmlFor="receipt-responsible">
                  Responsible
                </label>

                <input
                  id="receipt-responsible"
                  type="text"
                  placeholder="Enter responsible person"
                />
              </div>

              {/* RECEIPT DATE */}
              <div className="receipt-field">
                <label htmlFor="receipt-date">
                  Receipt Date
                </label>

                <input
                  id="receipt-date"
                  type="date"
                />
              </div>

              {/* SCHEDULED DATE */}
              <div className="receipt-field">
                <label htmlFor="scheduled-date">
                  Scheduled Date
                </label>

                <input
                  id="scheduled-date"
                  type="date"
                />
              </div>
            </div>
          </section>

          {/* PRODUCTS */}
          <section className="receipt-form-card products-card">
            <div className="receipt-section-header products-header">
              <div className="products-heading">
                <span className="receipt-section-eyebrow">
                  PRODUCTS
                </span>

                <h2>Products to Receive</h2>

                <p>
                  Add the products and quantities included in this receipt.
                </p>
              </div>

              <button
                type="button"
                className="add-product-button"
                onClick={addProduct}
              >
                <span>+</span>
                Add Product
              </button>
            </div>

            <div className="receipt-products-wrapper">
              <table className="receipt-products-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>QUANTITY</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          value={item.product}
                          onChange={(event) =>
                            updateProduct(
                              item.id,
                              "product",
                              event.target.value
                            )
                          }
                          placeholder="Enter product or SKU"
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(event) =>
                            updateProduct(
                              item.id,
                              "quantity",
                              event.target.value
                            )
                          }
                          placeholder="0"
                        />
                      </td>

                      <td className="product-action-cell">
                        <button
                          type="button"
                          className="remove-product-button"
                          onClick={() => removeProduct(item.id)}
                          disabled={products.length === 1}
                          aria-label="Remove product"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="products-empty-note">
              <span className="products-empty-dot"></span>

              <p>
                Product options will be loaded from the backend when connected.
              </p>
            </div>
          </section>

          {/* FORM ACTIONS */}
          <div className="receipt-form-actions">
            <button
              type="button"
              className="receipt-cancel-button"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="receipt-save-button"
            >
              Save Receipt
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ReceiptForm;