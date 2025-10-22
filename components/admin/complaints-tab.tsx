"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Download, Loader2, Send } from "lucide-react"
import type { Complaint } from "@/lib/types"
import { exportComplaintsToCSV, downloadCSV } from "@/lib/utils/csv-export"

export function ComplaintsTab() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [response, setResponse] = useState("")

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/admin/complaints")
      const data = await response.json()
      setComplaints(data.complaints || [])
    } catch (error) {
      console.error("Failed to fetch complaints:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const csv = exportComplaintsToCSV(complaints)
    downloadCSV(csv, `complaints-${new Date().toISOString().split("T")[0]}.csv`)
  }

  const handleSendResponse = async (complaintId: string) => {
    try {
      await fetch("/api/admin/complaints/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId, response }),
      })
      setRespondingTo(null)
      setResponse("")
      fetchComplaints()
    } catch (error) {
      console.error("Failed to send response:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
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
        {complaints.length === 0 ? (
          <Card className="p-12 text-center border-pink-100">
            <p className="text-muted-foreground">No complaints found</p>
          </Card>
        ) : (
          complaints.map((complaint) => (
            <Card key={complaint.id} className="p-6 border-pink-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{complaint.subject}</h3>
                    <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                    <Badge variant="outline">{complaint.complaintType}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {complaint.customerName} • {complaint.customerEmail}
                  </p>
                  {complaint.orderReference && (
                    <p className="text-sm text-muted-foreground">Order: {complaint.orderReference}</p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="text-sm text-muted-foreground">{complaint.description}</p>
              </div>

              {complaint.adminResponse && (
                <div className="mb-4 p-4 bg-pink-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Admin Response</p>
                  <p className="text-sm text-muted-foreground">{complaint.adminResponse}</p>
                </div>
              )}

              {respondingTo === complaint.id ? (
                <div className="space-y-3">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleSendResponse(complaint.id)} className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Response
                    </Button>
                    <Button variant="outline" onClick={() => setRespondingTo(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                !complaint.adminResponse && (
                  <Button onClick={() => setRespondingTo(complaint.id)} size="sm" variant="outline">
                    Respond
                  </Button>
                )
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
