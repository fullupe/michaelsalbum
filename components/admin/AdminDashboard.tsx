"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadForm from "./UploadForm";
import PhotoManager from "./PhotoManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <h1 className="font-cormorant text-3xl font-semibold md:text-4xl">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your wedding album content here
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Photos</TabsTrigger>
            <TabsTrigger value="manage">Manage Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <UploadForm />
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4">
            <PhotoManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}