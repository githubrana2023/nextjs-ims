import { db } from "@/drizzle/db";
import { salesMansTable } from "@/drizzle/schema";
import { and, eq, or } from "drizzle-orm";

export const getSalesmanByIdAndSupplierId = async (
  id: string,
  supplierId: string,
) => {
  return await db.query.salesMansTable.findFirst({
    where: and(
      eq(salesMansTable.id, id),
      eq(salesMansTable.supplierId, supplierId),
    ),
  });
};
export const getSalesmanByPhoneAndSupplierId = async (
  phone: string,
  supplierId: string,
) => {
  return await db.query.salesMansTable.findFirst({
    where: and(
      eq(salesMansTable.phone, phone),
      eq(salesMansTable.supplierId, supplierId),
    ),
  });
};

export const getSalesmanByNidAndSupplierId = async (
  nid: string,
  supplierId: string,
) => {
  return await db.query.salesMansTable.findFirst({
    where: and(
      eq(salesMansTable.nid, nid),
      eq(salesMansTable.supplierId, supplierId),
    ),
  });
};

export const getSalesmanByEmailAndSupplierId = async (
  email: string,
  supplierId: string,
) => {
  return await db.query.salesMansTable.findFirst({
    where: and(
      eq(salesMansTable.email, email),
      eq(salesMansTable.supplierId, supplierId),
    ),
  });
};




export const getSalesmanBySupplierIdAndPhoneOrEmailOrNid = async ({ phone, email="", nid="", supplierId }: {
  phone: string;
  email?: string;
  nid?: string;
  supplierId: string;
}) => {
  return await db.query.salesMansTable.findFirst({
    where: and(
      eq(salesMansTable.supplierId, supplierId),
      or(
        eq(salesMansTable.phone, phone),
        eq(salesMansTable.email, email),
        eq(salesMansTable.nid, nid),
      )
    ),
  });
};

