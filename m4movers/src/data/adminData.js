export const overviewCards = [
  { label: 'Total Users', value: '4,218', change: '+8.2%' },
  { label: 'Total Companies', value: '132', change: '+3.1%' },
  { label: 'Contact Requests', value: '389', change: '+12.4%' },
  { label: 'Total Emails Sent', value: '9,540', change: '+5.6%' },
  { label: 'Quote Requests', value: '612', change: '+9.8%' },
  { label: 'Total Orders', value: '1,284', change: '+6.3%' },
  { label: 'Pending Orders', value: '47', change: '-2.1%' },
  { label: 'Completed Orders', value: '1,109', change: '+7.4%' },
  { label: 'Cancelled Orders', value: '38', change: '-1.0%' },
  { label: 'New Complaints', value: '12', change: '-4.5%' },
  { label: 'Revenue (AED)', value: '2.84M', change: '+11.2%' },
  { label: 'Monthly Visitors', value: '58,930', change: '+14.7%' },
]

export const monthlyOrders = [
  { month: 'Jan', orders: 78, revenue: 156000 },
  { month: 'Feb', orders: 92, revenue: 184000 },
  { month: 'Mar', orders: 101, revenue: 202000 },
  { month: 'Apr', orders: 88, revenue: 176000 },
  { month: 'May', orders: 120, revenue: 240000 },
  { month: 'Jun', orders: 134, revenue: 268000 },
  { month: 'Jul', orders: 149, revenue: 298000 },
]

export const topServices = [
  { name: 'Home Relocation', value: 32 },
  { name: 'Office Relocation', value: 21 },
  { name: 'Villa Moving', value: 18 },
  { name: 'Packing Services', value: 15 },
  { name: 'Storage Solutions', value: 14 },
]

export const users = [
  { id: 'U-1001', name: 'Ahmed Al Farsi', email: 'ahmed.f@example.com', role: 'Customer', status: 'Active', joined: '2026-02-14' },
  { id: 'U-1002', name: 'Sara Mitchell', email: 'sara.m@example.com', role: 'Customer', status: 'Active', joined: '2026-03-02' },
  { id: 'U-1003', name: 'Rohit Nair', email: 'rohit.n@example.com', role: 'Customer', status: 'Blocked', joined: '2026-01-20' },
  { id: 'U-1004', name: 'Fatima Al Zaabi', email: 'fatima.z@example.com', role: 'Customer', status: 'Active', joined: '2026-04-11' },
  { id: 'U-1005', name: 'James Carter', email: 'james.c@example.com', role: 'Customer', status: 'Inactive', joined: '2025-12-30' },
  { id: 'U-1006', name: 'Mona Youssef', email: 'mona.y@example.com', role: 'Company', status: 'Active', joined: '2026-05-18' },
  { id: 'U-1007', name: 'Daniel Osei', email: 'daniel.o@example.com', role: 'Customer', status: 'Active', joined: '2026-06-01' },
]

export const contactRequests = [
  { id: 'CR-501', name: 'Layla Hassan', email: 'layla.h@example.com', subject: 'Question about villa moves', status: 'Unread', date: '2026-07-10' },
  { id: 'CR-502', name: 'Omar Siddiqui', email: 'omar.s@example.com', subject: 'International move pricing', status: 'Replied', date: '2026-07-09' },
  { id: 'CR-503', name: 'Grace Lin', email: 'grace.l@example.com', subject: 'Storage availability', status: 'Read', date: '2026-07-08' },
  { id: 'CR-504', name: 'Yousef Al Marri', email: 'yousef.m@example.com', subject: 'Office move on Friday', status: 'Unread', date: '2026-07-07' },
]

export const quoteRequests = [
  { id: 'QR-901', customer: 'Ahmed Al Farsi', service: 'Villa Moving', from: 'Arabian Ranches, Dubai', to: 'Al Barsha, Dubai', date: '2026-07-18', status: 'Pending' },
  { id: 'QR-902', customer: 'Sara Mitchell', service: 'Office Relocation', from: 'Business Bay, Dubai', to: 'DIFC, Dubai', date: '2026-07-20', status: 'Assigned' },
  { id: 'QR-903', customer: 'Fatima Al Zaabi', service: 'Storage Solutions', from: 'Khalifa City, Abu Dhabi', to: 'Storage Facility', date: '2026-07-15', status: 'Completed' },
  { id: 'QR-904', customer: 'James Carter', service: 'International Relocation', from: 'London, UK', to: 'Downtown Dubai', date: '2026-08-02', status: 'Pending' },
]

export const complaints = [
  { id: 'CMP-21', customer: 'Rohit Nair', priority: 'Medium', status: 'In Progress', assigned: 'Bilal K.', date: '2026-07-05' },
  { id: 'CMP-22', customer: 'Grace Lin', priority: 'Low', status: 'Resolved', assigned: 'Nadia S.', date: '2026-07-02' },
  { id: 'CMP-23', customer: 'Daniel Osei', priority: 'High', status: 'Open', assigned: 'Unassigned', date: '2026-07-11' },
]

export const orders = [
  { id: 'ORD-3301', customer: 'Ahmed Al Farsi', service: 'Villa Moving', amount: 'AED 4,200', status: 'Completed', date: '2026-06-28' },
  { id: 'ORD-3302', customer: 'Sara Mitchell', service: 'Office Relocation', amount: 'AED 6,800', status: 'Pending', date: '2026-07-20' },
  { id: 'ORD-3303', customer: 'Fatima Al Zaabi', service: 'Storage Solutions', amount: 'AED 1,150', status: 'Completed', date: '2026-05-15' },
  { id: 'ORD-3304', customer: 'James Carter', service: 'International Relocation', amount: 'AED 18,400', status: 'Cancelled', date: '2026-06-02' },
  { id: 'ORD-3305', customer: 'Mona Youssef', service: 'Warehouse Moving', amount: 'AED 9,300', status: 'Pending', date: '2026-07-22' },
]
