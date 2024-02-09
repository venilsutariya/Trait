"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";

const DisplayQuality = ({
    email
}: { email: string }) => {

    const [quality, setQuality] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchData = () => {
        setLoading(true);
        axios.get(`/api/get-quality/${email}`)
            .then((res) => setQuality(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleRemove = (id: string) => {
        setLoading(true);
        axios.delete(`/api/remove-quality/${id}`)
            .then((res) => fetchData())
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
                toast.success("Quality deleted successFully");
            })
    }

    const handleEdit = (id: string) => {
        router.push(`/addquality/${id}`)
    }

    return (
        <>
            <Table className="p-0">
                <TableHeader>
                    <TableRow>
                        <TableHead>Photo</TableHead>
                        <TableHead>Quality Name</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        quality.map((quality: any, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger>
                                            <img src={quality.photo} className="h-10 w-10 object-cover" alt="photo" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <img src={quality.photo} className="h-full w-full object-cover" alt="photo" />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell className="ps-4">
                                    {quality.qualityName}
                                </TableCell>
                                <TableCell className="ps-4">
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button variant={"outline"} size={"sm"}>
                                                Details
                                            </Button>
                                        </DrawerTrigger>
                                        <DrawerContent className="mb-4">
                                            <DrawerHeader>
                                                <DrawerTitle>Costing</DrawerTitle>
                                            </DrawerHeader>
                                            <div className="px-3 pb-3">
                                                <Table className=" text-center">
                                                    <TableRow>
                                                        <TableCell>Yarn Cost:</TableCell>
                                                        <TableCell>{quality.yarnCost} Rs.</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Warping Cost:</TableCell>
                                                        <TableCell>{quality.warpingCost} Rs.</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Extra Cost:</TableCell>
                                                        <TableCell>{quality.extraCost} Rs.</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Job Cost:</TableCell>
                                                        <TableCell>{quality.jobCost} Rs.</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Add Profit:</TableCell>
                                                        <TableCell>{quality.addProfit} Rs.</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Selling Price:</TableCell>
                                                        <TableCell>{quality.sellingPrice} Rs.</TableCell>
                                                    </TableRow>
                                                </Table>
                                            </div>
                                            <ScrollArea className="h-[400px] overflow-auto bg-zinc-100">
                                                <DrawerHeader>
                                                    <DrawerTitle>Construction</DrawerTitle>
                                                </DrawerHeader>
                                                <Table className=" text-center">
                                                    <TableRow>
                                                        <TableCell>Yarn:</TableCell>
                                                        <TableCell>{quality.yarnType}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Yarn Type:</TableCell>
                                                        <TableCell>{quality.whichYarn}</TableCell>
                                                    </TableRow>
                                                </Table>
                                                <DrawerHeader className="p-2">
                                                    <DrawerTitle className=" font-normal text-md">Yarn Detail</DrawerTitle>
                                                </DrawerHeader>
                                                <ScrollArea className="h-[150px] text-start rounded-md border p-2">
                                                    {quality.yarnDetail}
                                                </ScrollArea>
                                                <DrawerHeader className="p-2">
                                                    <DrawerTitle className=" font-normal text-md">Yarn Pattern</DrawerTitle>
                                                </DrawerHeader>
                                                <ScrollArea className="h-[150px] text-start rounded-md border p-2">
                                                    {quality.yarnPattern}
                                                </ScrollArea>
                                                <DrawerHeader className="p-2">
                                                    <DrawerTitle className=" font-normal text-md">Reed</DrawerTitle>
                                                </DrawerHeader>
                                                <ScrollArea className="h-[100px] text-start rounded-md border p-2">
                                                    {quality.reed}
                                                </ScrollArea>
                                                <DrawerHeader className="p-2">
                                                    <DrawerTitle className=" font-normal text-md">Reed Pattern</DrawerTitle>
                                                </DrawerHeader>
                                                <ScrollArea className="h-[100px] text-start rounded-md border p-2">
                                                    {quality.reedPattern}
                                                </ScrollArea>
                                                <DrawerHeader className="p-2">
                                                    <DrawerTitle className=" font-normal text-md">Drafting</DrawerTitle>
                                                </DrawerHeader>
                                                <ScrollArea className="h-[100px] text-start rounded-md border p-2">
                                                    {quality.drafting}
                                                </ScrollArea>
                                                {
                                                    quality.lessing !== "" && (
                                                        <>
                                                            <DrawerHeader className="p-2">
                                                                <DrawerTitle className=" font-normal text-md">Lessing</DrawerTitle>
                                                            </DrawerHeader>
                                                            <ScrollArea className="h-[100px] text-start rounded-md border p-2">
                                                                {quality.lessing}
                                                            </ScrollArea>
                                                        </>

                                                    )
                                                }
                                            </ScrollArea>
                                        </DrawerContent>
                                    </Drawer>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className=" border-none outline-none select-none"><MoreVertical /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="text-blue-500 hover:bg-blue-100" onClick={() => handleEdit(quality._id)}>Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500 hover:bg-red-100" onClick={() => handleRemove(quality._id)}>Remove</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className={` fixed items-center h-[100vh] w-[100vw] bg-white top-0 backdrop-blur-md flex ${!loading && " hidden"} my-3 justify-center w-full`}><Loader className=" animate-spin" /></div>
        </>
    );
}

export default DisplayQuality;