"use client";

import { useState } from "react";
import { updateOrderStatus } from "../actions";

interface Props {
  orderId: string;
  currentStatus: string;
}
// handle statuses
const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      await updateOrderStatus(orderId, newStatus);
      setStatus(newStatus);
    } catch {
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isUpdating}
      className="text-sm border border-gray-900 rounded px-2 py-1 text-gray-900 bg-white disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
