import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../lib/firebase/config"

async function initializeProduct() {
  try {
    const productRef = doc(db, "product", "main")

    await setDoc(productRef, {
      name: "Honeystixx Health Diagnosis Kit",
      price: 99.99,
      discount: 0,
      description: "Comprehensive women's health diagnosis kit with lab analysis and professional consultation",
      imageUrl: "/placeholder.svg?height=800&width=800",
      available: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    console.log("Product initialized successfully!")
  } catch (error) {
    console.error("Error initializing product:", error)
  }
}

initializeProduct()
