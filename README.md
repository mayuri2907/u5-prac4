# Practical 9: Delete Operation (Unit 5 Prac 4)

## Aim
Develop a Student Management application that displays students and provides a Delete button to remove a selected student from the displayed list.

## GitHub Repository
`https://github.com/mayuri2907/u5-prac4.git`

## Concepts Implemented
- **Delete Operation**: Uses JavaScript `Array.prototype.filter()` to remove the selected student immutably without altering the existing array directly.
- **Confirmation Dialogue**: Confirms intent before executing the deletion to prevent accidental loss of data.
- **Audit History**: Maintains a log of recently removed items with timestamps.
- **Empty State & Restoration**: Handles the empty condition cleanly with a single-click restore option.

## How to Run Locally
```bash
npm install
npm run dev
```

## Push to GitHub
```bash
git remote add origin https://github.com/mayuri2907/u5-prac4.git
git branch -M main
git push -u origin main
```
