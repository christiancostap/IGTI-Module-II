import express from 'express';
import fs from 'fs';
import { gradesGetAll, gradesInsert, gradesUpdate, gradesRemove, gradesSearch, sumStudentGrades, avgSubjectType, topSubjectTypeGrades } from '../controller/grades.js' 

const router = express.Router();

router.get('/getAll', gradesGetAll);
router.post('/insertOne', gradesInsert);
router.post('/updateOne', gradesUpdate);
router.post('/removeOne', gradesRemove);
router.get('/searchOne', gradesSearch);
router.get('/sumStudentGrades', sumStudentGrades);
router.get('/avgSubjectType', avgSubjectType);
router.get('/topSubjectTypeGrades', topSubjectTypeGrades);


export default router;
