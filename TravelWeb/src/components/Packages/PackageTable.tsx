import { useState, useEffect } from "react";
import axios from "axios";
import StyledTable from "../layouts/StyledTable";
import { PopupModal } from "../layouts/ContainerModal";
import { PackageForm } from "./PackageForm";
import { toast } from "sonner";


export const PackageTable = () => {
  interface PackageItem {
    id: string;
    packageTitle: string;
    location_id: any;
    price: number;
    discount: number;
  }
  const [tableData, setTableData] = useState([]);
  const [packageIdToUpdate, setPackageIdToUpdate] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get("http://localhost:8082/package/getAll")
      .then((response) => {
        const packagesArray = response.data.packages || [];
        const modifiedData =response.data.map((item: PackageItem) => ({
          packageid: item.id,
          name: item.packageTitle,
          locationid: item.location_id.locationId,
          price: item.price,
          discount: item.discount,
        }));
        setTableData(modifiedData);
        console.log();
        
        console.log("Response data:", packagesArray);

        console.log("pp",modifiedData);
        
      })
      
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const tableHeaders = ["PackageId", "Name" , "LocationId" , "Price" , "Discount" ,"Actions",];

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (packageId: string) => {
    setPackageIdToUpdate(packageId); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  //table button event handlers------------------------------------------
  const handleEditClick = (rowData: Record<string, any>) => {

   
        handleOpenModal(rowData.packageid);
      }
  const handleDeleteClick = async (rowData: Record<string, any>) => {
    if (
      window.confirm(
        `Are you sure you want to delete package ${rowData.packageid}?`
      )
    ) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:8082/package/deletePackage/${rowData.packageid}`
        );
        console.log("Delete Response:", deleteResponse);

        if (deleteResponse.status === 200) {
          console.log("Delete successful. Fetching updated data...");

          axios
      .get("http://localhost:8082/package/getAll")
      .then((response) => {
        const packagesArray = response.data.packages || [];
        const modifiedData =response.data.map((item: PackageItem) => ({
          packageid: item.id,
          name: item.packageTitle,
          locationid: item.location_id.locationId,
          price: item.price,
          discount: item.discount,
        }));
        setTableData(modifiedData);
        console.log();
        
        console.log("Response data:", packagesArray);

        console.log("pp",modifiedData);
        
      })


          // Display alert after updating state
          
          toast.success(`Package ${rowData.packageid} deleted successfully`, {
            position: "top-right",
          duration: 3000,
            
            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)", 
            },
          });
        } else {
          console.error("Delete request failed:", deleteResponse);
          // alert(deleteResponse.data.message || "Delete request failed");
          toast.error(deleteResponse.data.message || "Delete request failed", {
            position: "top-right",
          duration: 3000,
            
            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)", 
            },
          });
        }
      } catch (error) {
        console.error("Error deleting or fetching data:", error);

        toast.error("Error deleting or fetching data. Please check the console for more details.", {
          position: "top-right",
          duration: 3000,
          
          style: {
            minWidth: "300px",
            maxWidth: "400px",
            minHeight: "80px",
            fontSize: "18px",
            transform: "translateX(0%)", 
          },
        });
      }
    }
  };

  return (
    <>
      <div className="mt-8">
        <StyledTable
          data={tableData}
          headers={tableHeaders}
          tdClass="text-black font-semibold"
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      <div>
        <PopupModal isOpen={showModal} onClose={handleCloseModal}>
        <PackageForm id={packageIdToUpdate}/>
        </PopupModal>
      </div>
    </>
  );
};
