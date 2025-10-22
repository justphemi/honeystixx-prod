"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Loader2 } from "lucide-react"
import type { FormSubmission } from "@/lib/types"
import { exportFormsToCSV, downloadCSV } from "@/lib/utils/csv-export"

export function FormsTab() {
  const [forms, setForms] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      const response = await fetch("/api/admin/forms")
      const data = await response.json()
      setForms(data.forms || [])
    } catch (error) {
      console.error("Failed to fetch forms:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const csv = exportFormsToCSV(forms)
    downloadCSV(csv, `forms-${new Date().toISOString().split("T")[0]}.csv`)
  }

  const handleMarkAsRead = async (formId: string) => {
    try {
      await fetch("/api/admin/forms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, updates: { status: "read" } }),
      })
      fetchForms()
    } catch (error) {
      console.error("Failed to update form:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {forms.length === 0 ? (
          <Card className="p-12 text-center border-pink-100">
            <p className="text-muted-foreground">No form submissions found</p>
          </Card>
        ) : (
          forms.map((form) => (
            <Card key={form.id} className="p-6 border-pink-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{form.name}</h3>
                    <Badge variant={form.status === "new" ? "default" : "secondary"}>{form.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {form.email} • {form.phone}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{new Date(form.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Message</p>
                <p className="text-sm text-muted-foreground">{form.message}</p>
              </div>

              {form.status === "new" && (
                <Button onClick={() => handleMarkAsRead(form.id)} size="sm" variant="outline">
                  Mark as Read
                </Button>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
