import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const itemCss = "p-2 my-list-item";

function AccountMenu({ current }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header">
        <h4 className="mb-0 fw-semibold py-2">Account</h4>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column gap-2">
          <Link href="/account/profile">
            <a className={itemCss + (current == "profile" ? " active" : "")}>
              <FontAwesomeIcon
                icon={["fas", "user-alt"]}
                className="me-2"
                fixedWidth
              />
              My profile
            </a>
          </Link>

          <Link href="/account/order-history">
            <a
              className={
                itemCss + (current == "order-history" ? " active" : "")
              }
            >
              <FontAwesomeIcon
                icon={["fas", "truck"]}
                className="me-2"
                fixedWidth
              />
              Orders history
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;
