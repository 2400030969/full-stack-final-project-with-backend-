const { readData, writeData } = require('./fileHelper');

exports.submitProject = (req, res) => {
    const { studentId, assignmentId, fileName } = req.body;

    if (!studentId || !assignmentId || !fileName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const submissions = readData('submissions.json');

    const newSubmission = {
        id: `sub-${Date.now()}`,
        studentId,
        assignmentId,
        fileName,
        submittedAt: new Date().toISOString()
    };

    submissions.push(newSubmission);
    writeData('submissions.json', submissions);

    res.status(201).json({ message: 'Project submitted successfully', submission: newSubmission });
};

exports.getSubmissions = (req, res) => {
    const { assignmentId, studentId } = req.query;
    let submissions = readData('submissions.json');

    if (assignmentId) {
        submissions = submissions.filter(sub => sub.assignmentId === assignmentId);
    }
    if (studentId) {
        submissions = submissions.filter(sub => sub.studentId === studentId);
    }

    res.status(200).json(submissions);
};
