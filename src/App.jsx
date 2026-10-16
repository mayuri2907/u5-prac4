import { useState } from 'react';

function App() {
  // Sample initial student roster
  const initialStudents = [
    {
      id: 201,
      rollNo: '24CS01',
      name: 'Mayuri Vaishnav',
      course: 'B.Tech Computer Science',
      semester: '4th Sem',
      email: 'mayuri@student.edu',
    },
    {
      id: 202,
      rollNo: '24CS05',
      name: 'Rohan Sharma',
      course: 'Information Technology',
      semester: '4th Sem',
      email: 'rohan.s@student.edu',
    },
    {
      id: 203,
      rollNo: '24CS12',
      name: 'Priya Joshi',
      course: 'Computer Engineering',
      semester: '4th Sem',
      email: 'priya.j@student.edu',
    },
    {
      id: 204,
      rollNo: '24CS18',
      name: 'Karan Patel',
      course: 'BCA (Software Eng)',
      semester: '2nd Sem',
      email: 'karan.p@student.edu',
    },
    {
      id: 205,
      rollNo: '24CS22',
      name: 'Ananya Verma',
      course: 'Data Science & AI',
      semester: '6th Sem',
      email: 'ananya.v@student.edu',
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState('');
  const [deletedHistory, setDeletedHistory] = useState([]);

  // STEP 1: Prompt confirmation before deleting
  const promptDelete = (student) => {
    setDeleteConfirmation(student);
  };

  // STEP 2: DELETE OPERATION - Filter out the selected student by id
  const confirmDelete = () => {
    if (!deleteConfirmation) return;

    const studentToRemove = deleteConfirmation;

    // Immutable filter operation
    const updatedList = students.filter((s) => s.id !== studentToRemove.id);
    setStudents(updatedList);

    // Track in deleted log
    setDeletedHistory((prev) => [
      { ...studentToRemove, deletedAt: new Date().toLocaleTimeString() },
      ...prev,
    ]);

    setNotification(`Student "${studentToRemove.name}" was removed successfully.`);
    setDeleteConfirmation(null);

    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  // Cancel deletion dialog
  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  // Reset student records to initial state
  const handleResetRecords = () => {
    setStudents(initialStudents);
    setDeletedHistory([]);
    setNotification('Student roster reset to default sample records.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-slate-800">
              StudentAdmin<span className="text-red-600">.</span>
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              U5-PRAC 4
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            CRUD: Delete Operation
          </span>
        </div>
      </header>

      {/* Lab Banner */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-1">
          <div>
            <span className="font-semibold text-slate-800">Practical 9 (Unit 5 Prac 4):</span> Student Management (Delete Operation via Array filter)
          </div>
          <div className="text-red-700 font-medium">
            ● Unit 5 – CRUD Operations
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Metric Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-red-50 text-red-800 rounded border border-red-200">
              Action: DELETE
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mt-2">
              Active Enrolled Students
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Currently managing <strong className="text-slate-800">{students.length}</strong> active student records.
            </p>
          </div>

          <button
            onClick={handleResetRecords}
            className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 rounded-md text-xs font-medium transition"
          >
            ↻ Restore Default List
          </button>
        </div>

        {/* Success Alert */}
        {notification && (
          <div className="p-3 bg-slate-800 text-white text-xs rounded-lg flex justify-between items-center shadow-xs">
            <span>ℹ {notification}</span>
            <button onClick={() => setNotification('')} className="text-slate-300 hover:text-white font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal / Banner */}
        {deleteConfirmation && (
          <div className="p-5 bg-red-50 border-2 border-red-200 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-red-900 text-sm">
                Confirm Deletion: {deleteConfirmation.name} ({deleteConfirmation.rollNo})
              </h3>
              <p className="text-xs text-red-700 mt-1">
                Are you sure you want to remove this student record from the system? This action uses <code className="font-mono bg-white px-1">students.filter()</code>.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-xs font-semibold hover:bg-red-700 transition shadow-xs"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-md text-xs font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Student Records Table */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Student Directory
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Immutable Filter: Array.prototype.filter()
            </span>
          </div>

          {students.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm space-y-3">
              <p>All student records have been deleted.</p>
              <button
                onClick={handleResetRecords}
                className="px-4 py-2 bg-slate-800 text-white rounded-md text-xs font-medium hover:bg-slate-900 transition"
              >
                Restore Records
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Roll No</th>
                    <th className="p-3 border-b border-slate-200">Student Name</th>
                    <th className="p-3 border-b border-slate-200">Course / Branch</th>
                    <th className="p-3 border-b border-slate-200">Semester</th>
                    <th className="p-3 border-b border-slate-200">Email</th>
                    <th className="p-3 border-b border-slate-200 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-800">{student.rollNo}</td>
                      <td className="p-3 font-semibold text-slate-800">{student.name}</td>
                      <td className="p-3">{student.course}</td>
                      <td className="p-3">{student.semester}</td>
                      <td className="p-3 font-mono text-slate-500">{student.email}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => promptDelete(student)}
                          className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 rounded text-xs font-medium transition"
                        >
                          ✕ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recently Deleted Audit Log */}
        {deletedHistory.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 font-mono">
              Audit Log: Recently Deleted Records ({deletedHistory.length})
            </h3>
            <div className="space-y-2">
              {deletedHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded border border-slate-200 text-slate-600"
                >
                  <div>
                    <span className="font-semibold text-slate-700">{item.name}</span>{' '}
                    <span className="text-slate-400 font-mono">({item.rollNo})</span>
                  </div>
                  <div className="font-mono text-slate-400">Removed at {item.deletedAt}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        React Practical 9 (Unit 5 Prac 4) | CRUD: Delete Operation
      </footer>
    </div>
  );
}

export default App;
