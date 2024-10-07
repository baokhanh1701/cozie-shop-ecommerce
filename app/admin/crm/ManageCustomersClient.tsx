"use client";
import { User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
    MdCached,
    MdClose,
    MdDelete,
    MdDone,
    MdRemoveRedEye,
} from "react-icons/md";
// import ActionBtn from "@/app/components/ActionBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import ActionBtn from "@/app/components/ActionBtn";
import getCustomersFromHubspot from "@/actions/getCustomersFromHubspot"

interface ManageCustomersClientProps {
    customers: User[] | null;
}

// interface ManageCustomersClientProps {
//     customers: any | null;
// }
//! Dirty dirty code

const ManageCustomersClient: React.FC<ManageCustomersClientProps> = ({
    customers
}) => {
    const [data, setData] = useState([])
    let rows: any = [];
    let customers_from_hubspot: any = [];
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        { field: "email", headerName: "Email", width: 220 },
        {
            field: "emailVerified",
            headerName: "Email Verified",
            width: 150,
            renderCell: (params) => (
                <Status
                    icon={params.row.emailVerified ? MdDone : MdClose}
                    bg="bg-teal-200"
                    color="text-teal-700"
                    text={params.row.emailVerified ? "Verified" : "Not Verified"}

                />
            ),
        },
        { field: "createdAt", headerName: "Created", width: 220 }
    ]

    // TODO: Only supports get Customers from Hubspot, not sync
    // For the sake of SDA, I don't care.
    const handleSyncCustomersFromHubspot = async () => {
        toast("Syncing customers from Hubspot, please wait...");
        try {
            customers_from_hubspot = await getCustomersFromHubspot();
            // customers_from_hubspot = JSON.parse(customers_from_hubspot);

            if (customers_from_hubspot) {
                rows = customers_from_hubspot.map((customer: any) => {
                    return {
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        emailVerified: customer.emailVerified,
                        image: customer.image,
                        createdAt: customer.createdAt,
                        updateAt: customer.updateAt,
                    };
                });
                setData(rows);
            }
            toast.success("Synced");
        } catch (err: any) {
            toast.error(err);
            console.log(err);
            throw new Error(err)
        } 
    }
    useEffect(() => {
        handleSyncCustomersFromHubspot()
    }, [])

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Customers" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};
export default ManageCustomersClient;