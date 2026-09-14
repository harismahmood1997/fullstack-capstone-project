const image = (photo) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&q=80`

const gifts = [
  { id: 1, name: 'Wooden Chair', description: 'Used wooden chair in good condition.', category: 'Furniture', location: 'Lahore', image: image('photo-1503602642458-232111445657'), postedBy: 'Ali', postedDate: '2026-09-01' },
  { id: 2, name: 'Study Table', description: 'Compact table that is useful for study or work.', category: 'Furniture', location: 'Islamabad', image: image('photo-1518455027359-f3f8164ba6bd'), postedBy: 'Sara', postedDate: '2026-09-02' },
  { id: 3, name: 'Bookshelf', description: 'A small bookshelf ready for a new collection.', category: 'Furniture', location: 'Karachi', image: image('photo-1594620302200-9a762244a156'), postedBy: 'Hamza', postedDate: '2026-09-03' },
  { id: 4, name: 'Table Lamp', description: 'Warm lamp for a desk, bedroom, or reading corner.', category: 'Electronics', location: 'Lahore', image: image('photo-1507473885765-e6ed057f782c'), postedBy: 'Ayesha', postedDate: '2026-09-04' },
  { id: 5, name: 'Small Fan', description: 'Quiet desk fan in working condition.', category: 'Electronics', location: 'Multan', image: image('photo-1565031491910-e57fac031c41'), postedBy: 'Bilal', postedDate: '2026-09-05' },
  { id: 6, name: 'Kitchen Plates', description: 'Clean ceramic plates in a simple white design.', category: 'Kitchen', location: 'Faisalabad', image: image('photo-1603199506016-b9a594b593c0'), postedBy: 'Nida', postedDate: '2026-09-06' },
  { id: 7, name: 'Cooking Pan', description: 'Used non-stick pan that still works well.', category: 'Kitchen', location: 'Rawalpindi', image: image('photo-1556911220-e15b29be8c8f'), postedBy: 'Usman', postedDate: '2026-09-07' },
  { id: 8, name: 'Old School Bag', description: 'Lightly used backpack with room for books.', category: 'Other', location: 'Peshawar', image: image('photo-1553062407-98eeb64c6a62'), postedBy: 'Zainab', postedDate: '2026-09-08' },
  { id: 9, name: 'Winter Jacket', description: 'Warm jacket looking for a new owner.', category: 'Clothing', location: 'Quetta', image: image('photo-1551028719-00167b16eac5'), postedBy: 'Omar', postedDate: '2026-09-09' },
  { id: 10, name: 'Used Books', description: 'A small bundle of novels and non-fiction books.', category: 'Books', location: 'Lahore', image: image('photo-1495446815901-a7297e633e8d'), postedBy: 'Mariam', postedDate: '2026-09-10' },
  { id: 11, name: 'Computer Keyboard', description: 'Basic USB keyboard for a home computer.', category: 'Electronics', location: 'Sialkot', image: image('photo-1587829741301-dc798b83add3'), postedBy: 'Danish', postedDate: '2026-09-11' },
  { id: 12, name: 'Computer Mouse', description: 'Simple wired mouse in good working condition.', category: 'Electronics', location: 'Gujranwala', image: image('photo-1527814050087-3793815479db'), postedBy: 'Hina', postedDate: '2026-09-12' },
  { id: 13, name: 'Small Sofa', description: 'Comfortable two-seat sofa with light signs of use.', category: 'Furniture', location: 'Islamabad', image: image('photo-1555041469-a586c61ea9bc'), postedBy: 'Raza', postedDate: '2026-09-13' },
  { id: 14, name: 'Coffee Table', description: 'Small wooden coffee table for a living room.', category: 'Furniture', location: 'Karachi', image: image('photo-1532372576444-dda954194ad0'), postedBy: 'Iqra', postedDate: '2026-09-14' },
  { id: 15, name: 'Water Bottle', description: 'Reusable water bottle that needs a new home.', category: 'Other', location: 'Lahore', image: image('photo-1602143407151-7111542de6e8'), postedBy: 'Ahmed', postedDate: '2026-09-15' },
  { id: 16, name: 'Wall Clock', description: 'Simple wall clock for a kitchen or bedroom.', category: 'Other', location: 'Murree', image: image('photo-1563861826100-9cb868fdbe1c'), postedBy: 'Sana', postedDate: '2026-09-16' },
]

export default gifts
