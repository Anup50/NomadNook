
import { useState, useEffect } from "react";
import StyledTable from "../layouts/StyledTable2";
import axios from "axios";
import { toast } from "sonner";

export const LocationTable = () => {
    interface LocationItem {
      locationId: string;
      location: string;
      longitude: number;
      latitude: number;
    }
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:8082/location/getAll")
        .then((response) => {
          const packagesArray = response.data.packages || [];
          const modifiedData =response.data.map((item: LocationItem) => ({
            id: item.locationId,
            name: item.location,
            longitude: item.longitude,
            latitude: item.latitude,
          }));
          setTableData(modifiedData);
          console.log();
          
          console.log("Response data:", packagesArray);
  
          console.log("pp",modifiedData);
          
        })
        
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
    const tableHeaders = ["Id", "Name", "Longitude" , "Latitude" ,"Actions",];
  
  
    //table button event handlers------------------------------------------
    const handleDeleteClick = async (rowData: Record<string, any>) => {
      if (
        window.confirm(
          `Are you sure you want to delete package ${rowData.id}?`
        )
      ) {
        try {
          const deleteResponse = await axios.delete(
            `http://localhost:8082/location/deleteById/${rowData.id}`
          );
          console.log("Delete Response:", deleteResponse);
  
          if (deleteResponse.status === 200) {
            console.log("Delete successful. Fetching updated data...");
  
            axios
            .get("http://localhost:8082/location/getAll")
            .then((response) => {
              const packagesArray = response.data.packages || [];
              const modifiedData =response.data.map((item: LocationItem) => ({
                id: item.locationId,
                name: item.location,
                longitude: item.longitude,
                latitude: item.latitude,
              }));
              setTableData(modifiedData);
          console.log();
          
          console.log("Response data:", packagesArray);
  
          console.log("pp",modifiedData);
          
        })
  

            
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
        <div className="m-10">
          <StyledTable
            data={tableData}
            headers={tableHeaders}
            tdClass="text-black font-semibold"
            onDeleteClick={handleDeleteClick}
          />
        </div>
        
      </>
    );
  };
  