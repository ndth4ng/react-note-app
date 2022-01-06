import { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Context data
  const ModalContextData = {
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showDeletePostModal,
    setShowDeletePostModal,
    showToast,
    setShowToast,
  };
  return (
    <ModalContext.Provider value={ModalContextData}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
