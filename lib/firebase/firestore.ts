import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "./config"
import type { Order, FormSubmission, Product, Complaint } from "../types"

// Product operations
export async function getProduct(): Promise<Product | null> {
  try {
    const docRef = doc(db, "product", "main")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt || new Date(),
        updatedAt: data.updatedAt || new Date(),
      } as Product
    }
    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function updateProduct(updates: Partial<Product>): Promise<void> {
  const docRef = doc(db, "product", "main")
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}

// Order operations
export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const ordersRef = collection(db, "orders")
  const docRef = await addDoc(ordersRef, {
    ...orderData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return docRef.id
}

export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const docRef = doc(db, "orders", orderId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order
    }
    return null
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export async function getOrderByReference(reference: string): Promise<Order | null> {
  try {
    const ordersRef = collection(db, "orders")
    const q = query(ordersRef, where("orderReference", "==", reference))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order
    }
    return null
  } catch (error) {
    console.error("Error fetching order by reference:", error)
    return null
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders")
    const q = query(ordersRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function updateOrder(orderId: string, updates: Partial<Order>): Promise<void> {
  const docRef = doc(db, "orders", orderId)
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}

// Form submission operations
export async function createFormSubmission(
  formData: Omit<FormSubmission, "id" | "createdAt" | "status">,
): Promise<string> {
  const formsRef = collection(db, "forms")
  const docRef = await addDoc(formsRef, {
    ...formData,
    status: "new",
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function getAllFormSubmissions(): Promise<FormSubmission[]> {
  try {
    const formsRef = collection(db, "forms")
    const q = query(formsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as FormSubmission
    })
  } catch (error) {
    console.error("Error fetching form submissions:", error)
    return []
  }
}

export async function updateFormSubmission(formId: string, updates: Partial<FormSubmission>): Promise<void> {
  const docRef = doc(db, "forms", formId)
  await updateDoc(docRef, updates)
}

// Complaint operations
export async function createComplaint(
  complaintData: Omit<Complaint, "id" | "createdAt" | "updatedAt" | "status">,
): Promise<string> {
  const complaintsRef = collection(db, "complaints")
  const docRef = await addDoc(complaintsRef, {
    ...complaintData,
    status: "pending",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return docRef.id
}

export async function getAllComplaints(): Promise<Complaint[]> {
  try {
    const complaintsRef = collection(db, "complaints")
    const q = query(complaintsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        resolvedAt: data.resolvedAt?.toDate(),
      } as Complaint
    })
  } catch (error) {
    console.error("Error fetching complaints:", error)
    return []
  }
}

export async function updateComplaint(complaintId: string, updates: Partial<Complaint>): Promise<void> {
  const docRef = doc(db, "complaints", complaintId)
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}
