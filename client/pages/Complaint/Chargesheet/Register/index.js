import { useState } from "react";
import Button from "@/Components/Button";
import ShortUniqueId from "short-unique-id";
import { toast } from "react-toastify";
import Badge from "@/Components/Badge";

const ChargesheetForm = () => {
  const uid = new ShortUniqueId({ length: 2 });
  const [formData, setFormData] = useState({
    complaintID: "",
    filingDateTime: "",
    complainant: {
      name: "",
      address: "",
      contact: "",
    },
    accused: {
      name: "",
      address: "",
      identification: "",
      contact: "",
    },
    offense: {
      type: "",
      description: "",
      occurrenceDateTime: "",
      placeOfOccurrence: "",
    },
    witness: {
      name: "",
      address: "",
      contact: "",
    },
    supportingDocuments: [],
    investigatingOfficer: {
      name: "",
      badgeID: "",
      contact: "",
    },
  });

  const [listOfAccused, setListOfAccused] = useState([]);
  const [listOfWitness, setListOfWitness] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if name contains dot notation to access nested object keys
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addAccused = () => {
    const accused = formData.accused;
    if (
      accused.address === "" ||
      accused.name === "" ||
      accused.identification === "" ||
      accused.contact === ""
    )
      return toast.warn("All details of the accused should be entered.");
    accused.id = uid();
    setListOfAccused((prev) => [...prev, accused]);
    setFormData((prev) => ({
      ...formData,
      accused: {
        name: "",
        address: "",
        identification: "",
        contact: "",
      },
    }));
  };

  const removeAccused = (id) => {
    const updatedListOfAccused = listOfAccused.filter((d) => d.id !== id);
    setListOfAccused(updatedListOfAccused);
  };

  const addWitness = () => {
    const witness = formData.witness;
    if (witness.name === "" || witness.address === "" || witness.contact === "")
      return toast.warn("Enter all the details of the witness.");
    witness.id = uid();
    setListOfWitness((prev) => [...prev, witness]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow my-7 p-8 overflow-auto h-[90vh] xs:w-[90%] w-[50%]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          File Chargesheet
        </h2>

        <form className="overflow-auto">
          {/* Complaint ID */}
          <div className="mb-4">
            <label className="font-bold mb-2 block" htmlFor="complaintID">
              Complaint ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="complaintID"
              name="complaintID"
              className="border border-gray-300 rounded p-2 w-full"
              required
              value={formData.complaintID}
              onChange={handleChange}
            />
          </div>

          {/* Filing Date and Time */}
          <div className="mb-4">
            <label className="font-bold mb-2 block" htmlFor="filingDateTime">
              Date and Time of Filing <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="filingDateTime"
              name="filingDateTime"
              className="border border-gray-300 rounded p-2 w-full"
              required
              value={formData.filingDateTime}
              onChange={handleChange}
            />
          </div>

          {/* Complainant Details */}
          <div className="mb-4">
            <label className="font-bold mb-2 block">Complainant Details</label>

            {/* Complainant Name */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="complainantName">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="complainantName"
                name="complainant.name"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.complainant.name}
                onChange={handleChange}
              />
            </div>

            {/* Complainant Address */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="complainantAddress">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="complainantAddress"
                name="complainant.address"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.complainant.address}
                onChange={handleChange}
              />
            </div>

            {/* Complainant Contact */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="complainantContact">
                Contact Information <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="complainantContact"
                name="complainant.contact"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.complainant.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Accused Details */}
          <div className="mb-4">
            <label className="text-center text-stone-500 font-bold mb-2 block">
              Accused Details
            </label>

            {/* Accused Name */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="accusedName">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="accusedName"
                name="accused.name"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.accused.name}
                onChange={handleChange}
              />
            </div>

            {/* Accused Address */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="accusedAddress">
                Address
              </label>
              <input
                type="text"
                id="accusedAddress"
                name="accused.address"
                className="border border-gray-300 rounded p-2 w-full"
                value={formData.accused.address}
                onChange={handleChange}
              />
            </div>

            {/* Accused Identification */}
            <div className="mb-2">
              <label
                className="font-bold block"
                htmlFor="accusedIdentification"
              >
                Identification
              </label>
              <input
                type="text"
                id="accusedIdentification"
                name="accused.identification"
                className="border border-gray-300 rounded p-2 w-full"
                value={formData.accused.identification}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="font-bold block" htmlFor="accusedContact">
                Contact
              </label>
              <input
                type="text"
                id="accusedContact"
                name="accused.contact"
                className="border border-gray-300 rounded p-2 w-full"
                value={formData.accused.contact}
                onChange={handleChange}
              />
            </div>
            <Button
              type="button"
              outlined
              onClick={addAccused}
              className="w-full"
            >
              Add Accused to the List
            </Button>
            {listOfAccused.length !== 0 && (
              <div>
                <h2 className="my-2 text-center font-bold text-stone-700">
                  List Of Accused
                </h2>

                {listOfAccused.map((accused) => (
                  <Badge
                    id={accused.id}
                    name={accused.name}
                    onDelete={(id) => removeAccused(id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Offense Details */}
          <div className="mb-4">
            <label className="font-bold mb-2 block">Offense Details</label>

            {/* Offense Type */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="offenseType">
                Offense Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="offenseType"
                name="offense.type"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.offense.type}
                onChange={handleChange}
              />
            </div>

            {/* Offense Description */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="offenseDescription">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="offenseDescription"
                name="offense.description"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.offense.description}
                onChange={handleChange}
              />
            </div>

            {/* Offense Occurrence Date and Time */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="occurrenceDateTime">
                Date and Time of Occurrence{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="occurrenceDateTime"
                name="offense.occurrenceDateTime"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.offense.occurrenceDateTime}
                onChange={handleChange}
              />
            </div>

            {/* Place of Occurrence */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="placeOfOccurrence">
                Place of Occurrence <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="placeOfOccurrence"
                name="offense.placeOfOccurrence"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.offense.placeOfOccurrence}
                onChange={handleChange}
              />
            </div>

            {/* Witnesses */}
            <div className="mb-2">
              <label className="font-bold block" htmlFor="witnesses">
                Witnesses
              </label>
              <input
                type="text"
                id="witnesses"
                name="offense.witnesses"
                className="border border-gray-300 rounded p-2 w-full"
                value={formData.offense.witnesses}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="mb-4">
            <label className="font-bold mb-2 block">Supporting Documents</label>
            <input
              type="file"
              multiple
              name="supportingDocuments"
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleChange}
            />
          </div>

          {/* Investigating Officer Details */}
          <div className="mb-4">
            <label className="font-bold mb-2 block">
              Investigating Officer Details
            </label>

            {/* Investigating Officer Name */}
            <div className="mb-2">
              <label
                className="font-bold block"
                htmlFor="investigatingOfficerName"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="investigatingOfficerName"
                name="investigatingOfficer.name"
                className="border border-gray-300 rounded p-2 w-full"
                required
                value={formData.investigatingOfficer.name}
                onChange={handleChange}
              />
            </div>

            {/* Investigating Officer Badge ID */}
            <div className="mb-2">
              <label
                className="font-bold block"
                htmlFor="investigatingOfficerBadgeID"
              >
                Badge ID
              </label>
              <input
                type="text"
                id="investigatingOfficerBadgeID"
                name="investigatingOfficer.badgeID"
                className="border border-gray-300 rounded p-2 w-full"
                value={formData.investigatingOfficer.badgeID}
                onChange={handleChange}
              />
            </div>

            {/* Investigating Officer Contact */}
            <div className="mb-2">
              <label
                className="font-bold block"
                htmlFor="investigatingOfficerContact"
              >
                Contact Information
              </label>
              <input
                type="text"
                id="investigatingOfficerContact"
                name="investigatingOfficer.contact"
                className="border border-gray-300 rounded p-2 w-full"
                value={formData.investigatingOfficer.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChargesheetForm;
