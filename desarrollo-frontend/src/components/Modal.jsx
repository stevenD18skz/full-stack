import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUsers from "./ModalUsers";
import ModalWorks from "../components/ModalWorks";
import ModalTask from "./ModalTask";
import ModalProgressTask from "../components/ModalProgressTask"; 


export default function Modal({
  modalType,
  crudType,
  formData,
  closeModal,
  setFormData,
  handleSubmit,
  objectModel,
  id_padre
}) {


  const showInfoModal = (modalType) => {
    switch (modalType) {
      case "users":
        return <ModalUsers
            modalType={modalType}
            crudType={crudType}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            usuario={objectModel}
          />


        
      case "works":
        return <ModalWorks 
            modalType={modalType}
            crudType={crudType}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            objectModel={objectModel}/>;



      case "tasks":
        return <ModalTask 
            modalType={modalType}
            crudType={crudType}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            objectModel={objectModel}
            id_padre={id_obra}
          />;      

          
        case "progress":
          return <ModalProgressTask 
              modalType={modalType}
              crudType={crudType}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              objectModel={objectModel}
              id_padre={id_padre}
            />;



      default:
        return null;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            style={{ color: "#113778" }}
          />
        </span>
        {showInfoModal(modalType)}
      </div>
    </div>
  );
}
