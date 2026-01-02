import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Mock Data
const mockUsers = [
  { id: 1, name: 'John Student', email: 'john@university.edu', role: 'student' },
  { id: 2, name: 'Sarah Grad', email: 'sarah@university.edu', role: 'student' },
  { id: 3, name: 'Mike Senior', email: 'mike@university.edu', role: 'student' },
  { id: 4, name: 'Admin User', email: 'admin@university.edu', role: 'admin' }
];

const initialListings = [
  {
    id: 1,
    title: 'Calculus Textbook',
    description: 'Calculus: Early Transcendentals, 8th Edition. Great condition, barely used.',
    price: 45,
    seller: 'John Student',
    sellerId: 1,
    status: 'available',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'MacBook Air 2020',
    description: '13-inch MacBook Air with M1 chip. Perfect for coding and school work.',
    price: 800,
    seller: 'Sarah Grad',
    sellerId: 2,
    status: 'available',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Scientific Calculator',
    description: 'TI-84 Plus calculator. Essential for math and science courses.',
    price: 75,
    seller: 'Mike Senior',
    sellerId: 3,
    status: 'available',
    createdAt: '2024-01-12'
  },
  {
    id: 4,
    title: 'Bike Lock',
    description: 'Heavy-duty U-lock for campus bike security.',
    price: 25,
    seller: 'John Student',
    sellerId: 1,
    status: 'available',
    createdAt: '2024-01-08'
  }
];

const initialTransactions = [
  {
    id: 1,
    listingId: 5,
    listingTitle: 'Coffee Mug Set',
    buyer: 'Sarah Grad',
    buyerId: 2,
    seller: 'Mike Senior',
    sellerId: 3,
    price: 15,
    date: '2024-01-05'
  }
];

// Components
const Navbar = ({ currentUser, onUserChange }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">Student Marketplace</div>
          <ul className="navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Listing</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
          <div className="user-selector">
            <span>Logged in as:</span>
            <select 
              value={currentUser?.id || ''} 
              onChange={(e) => {
                const user = mockUsers.find(u => u.id === parseInt(e.target.value));
                onUserChange(user);
              }}
            >
              <option value="">Select User</option>
              {mockUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = ({ listings, onBuy, currentUser, onDeleteListing }) => {
  const [alert, setAlert] = useState('');

  const handleBuy = (listing) => {
    if (!currentUser) {
      setAlert('Please select a user to buy items');
      return;
    }
    if (listing.sellerId === currentUser.id) {
      setAlert('You cannot buy your own item');
      return;
    }
    onBuy(listing);
    setAlert('Item purchased successfully!');
    setTimeout(() => setAlert(''), 3000);
  };

  const handleDelete = (listing) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      onDeleteListing(listing.id);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <h1 className="page-title">Student Marketplace</h1>
        
        {alert && (
          <div className={`alert ${alert.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
            {alert}
          </div>
        )}

        <div className="grid">
          {listings.map(listing => (
            <div key={listing.id} className="card">
              <h3 className="card-title">{listing.title}</h3>
              <div className="card-price">${listing.price}</div>
              <div className="card-seller">Seller: {listing.seller}</div>
              <div className="card-description">{listing.description}</div>
              <div className={`card-status status-${listing.status}`}>
                {listing.status === 'available' ? 'Available' : 'Sold'}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {listing.status === 'available' && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleBuy(listing)}
                    disabled={!currentUser || listing.sellerId === currentUser?.id}
                  >
                    Buy Now
                  </button>
                )}
                
                {(currentUser?.role === 'admin' || listing.sellerId === currentUser?.id) && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(listing)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreateListingPage = ({ onCreateListing, currentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [alert, setAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setAlert('Please select a user to create listings');
      return;
    }

    if (!formData.title || !formData.description || !formData.price) {
      setAlert('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setAlert('Please enter a valid price');
      return;
    }

    onCreateListing({
      title: formData.title,
      description: formData.description,
      price: price,
      seller: currentUser.name,
      sellerId: currentUser.id
    });

    setAlert('Listing created successfully!');
    setFormData({ title: '', description: '', price: '' });
    
    setTimeout(() => {
      setAlert('');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container">
      <div className="main-content">
        <h1 className="page-title">Create New Listing</h1>
        
        {alert && (
          <div className={`alert ${alert.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
            {alert}
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter item title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your item"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-input"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

const DashboardPage = ({ listings, transactions, currentUser }) => {
  const myListings = listings.filter(listing => listing.sellerId === currentUser?.id);
  const myPurchases = transactions.filter(transaction => transaction.buyerId === currentUser?.id);

  return (
    <div className="container">
      <div className="main-content">
        <h1 className="page-title">Dashboard</h1>
        
        {!currentUser ? (
          <div className="alert alert-error">
            Please select a user to view your dashboard
          </div>
        ) : (
          <div className="dashboard-grid">
            <div className="dashboard-section">
              <h3>My Listings ({myListings.length})</h3>
              {myListings.length === 0 ? (
                <div className="empty-state">
                  <p>You haven't created any listings yet.</p>
                  <Link to="/create" className="btn btn-primary">Create Your First Listing</Link>
                </div>
              ) : (
                <div className="grid">
                  {myListings.map(listing => (
                    <div key={listing.id} className="card">
                      <h4 className="card-title">{listing.title}</h4>
                      <div className="card-price">${listing.price}</div>
                      <div className={`card-status status-${listing.status}`}>
                        {listing.status === 'available' ? 'Available' : 'Sold'}
                      </div>
                      <div className="card-description">{listing.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-section">
              <h3>My Purchases ({myPurchases.length})</h3>
              {myPurchases.length === 0 ? (
                <div className="empty-state">
                  <p>You haven't purchased any items yet.</p>
                  <Link to="/" className="btn btn-primary">Browse Items</Link>
                </div>
              ) : (
                <div className="grid">
                  {myPurchases.map(transaction => (
                    <div key={transaction.id} className="card">
                      <h4 className="card-title">{transaction.listingTitle}</h4>
                      <div className="card-price">${transaction.price}</div>
                      <div className="card-seller">Seller: {transaction.seller}</div>
                      <div className="card-status status-sold">Purchased</div>
                      <div style={{ color: '#666', fontSize: '0.875rem' }}>
                        Date: {transaction.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState(initialListings);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [nextListingId, setNextListingId] = useState(5);
  const [nextTransactionId, setNextTransactionId] = useState(2);

  const handleBuy = (listing) => {
    // Mark listing as sold
    setListings(prev => 
      prev.map(l => 
        l.id === listing.id 
          ? { ...l, status: 'sold' }
          : l
      )
    );

    // Add transaction
    const newTransaction = {
      id: nextTransactionId,
      listingId: listing.id,
      listingTitle: listing.title,
      buyer: currentUser.name,
      buyerId: currentUser.id,
      seller: listing.seller,
      sellerId: listing.sellerId,
      price: listing.price,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions(prev => [...prev, newTransaction]);
    setNextTransactionId(prev => prev + 1);
  };

  const handleCreateListing = (listingData) => {
    const newListing = {
      id: nextListingId,
      ...listingData,
      status: 'available',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setListings(prev => [...prev, newListing]);
    setNextListingId(prev => prev + 1);
  };

  const handleDeleteListing = (listingId) => {
    setListings(prev => prev.filter(l => l.id !== listingId));
  };

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} onUserChange={setCurrentUser} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                listings={listings} 
                onBuy={handleBuy} 
                currentUser={currentUser}
                onDeleteListing={handleDeleteListing}
              />
            } 
          />
          <Route 
            path="/create" 
            element={
              <CreateListingPage 
                onCreateListing={handleCreateListing} 
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <DashboardPage 
                listings={listings} 
                transactions={transactions} 
                currentUser={currentUser}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;