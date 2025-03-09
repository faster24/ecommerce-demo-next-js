import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountMenu from "../../components/account-menu";
import AddressView from "../../components/account/address-view";
import Layout from "../../components/layout";
import { useAppContext } from "../../lib/AppContext";
import { useEffect, useState } from "react";

const cities = ["Yangon", "Mandalay", "Kalaw"];
const states = ["Thar Kay Ta", "Daw Pon", "San Chaung"];

function Profile() {
  const { user, getProfile, updateProfile, loading, error } = useAppContext();

  // Local state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    gender: "male",
    city: cities[0],
    state: states[0],
    birthday: "",
  });

  // Fetch profile data on mount
  useEffect(() => {
    if (!user) {
      getProfile().then((profile) => {
        if (profile) {
          setFormData({
            name: profile.name || "",
            email: profile.email || "",
            password: "", // Don’t prefill password
            password_confirmation: "",
            phone: profile.phone || "",
            gender: profile.gender || "male",
            city: profile.city || cities[0],
            state: profile.state || states[0],
            birthday: profile.birthday ? profile.birthday.split("T")[0] : "", // Format date
          });
        }
      }).catch(() => {
        // Error handled by AppContext
      });
    } else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        phone: user.phone || "",
        gender: user.gender || "male",
        city: user.city || cities[0],
        state: user.state || states[0],
        birthday: user.birthday ? user.birthday.split("T")[0] : "",
      });
    }
  }, [user, getProfile]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      // Remove empty password fields if not updated
      if (!updatedData.password) {
        delete updatedData.password;
        delete updatedData.password_confirmation;
      }
      await updateProfile(updatedData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      // Error is set in AppContext and can be displayed
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div>
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  My Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <AccountMenu current="profile" />
          </div>
          <div className="col-lg-9">
            <div className="row g-3">
              <div className="col-lg-9">
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h4 className="card-title fw-semibold mt-2 mb-3">
                      Profile
                    </h4>
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-6">
                        <label className="form-label">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Leave blank to keep unchanged"
                        />
                        {formData.password && (
                          <div className="mt-2">
                            <label className="form-label">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="password_confirmation"
                              value={formData.password_confirmation}
                              onChange={handleChange}
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-md-12 mt-0">
                        <label className="form-label">Phone</label>
                        <div className="input-group">
                          <div>
                            <select className="form-select rounded-0 rounded-start bg-light">
                              <option>+95</option>
                            </select>
                          </div>
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <select
                          className="form-select"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          {cities.map((e, i) => (
                            <option key={i} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">States</label>
                        <select
                          className="form-select"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          {states.map((e, i) => (
                            <option key={i} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Birthday</label>
                        <input
                          type="date"
                          className="form-control"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12 mt-4">
                        <button type="submit" className="btn btn-primary float-end">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="p-3 d-flex border-bottom">
                    <h5 className="my-auto fw-semibold">Addresses</h5>
                    <button className="btn btn-sm btn-secondary text-primary ms-auto">
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                       Add new
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-lg-2 g-3">
                      <div className="col">
                        <AddressView />
                      </div>
                      <div className="col">
                        <AddressView />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

Profile.getLayout = (page) => {
  return <Layout simpleHeader>{page}</Layout>;
};

export default Profile;
