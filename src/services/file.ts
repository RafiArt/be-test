import { FileModel } from '../models/File';
import { ProcessedDataModel } from '../models/ProcessedData';
import { promisify } from 'util';
import { readFile } from 'fs';
import xlsx from 'xlsx';

const readFileAsync = promisify(readFile);

export const processExcelFile = async (fileId: string, filePath: string) => {
    try {
        // Update file status to processing
        await FileModel.findByIdAndUpdate(fileId, { status: 'processing' });

        // Mock processing delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Read and parse Excel file
        const fileBuffer = await readFileAsync(filePath);
        const workbook = xlsx.read(fileBuffer);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Save processed data
        const processedData = new ProcessedDataModel({
            fileId,
            data
        });
        await processedData.save();

        // Update file status to completed
        await FileModel.findByIdAndUpdate(fileId, { 
            status: 'completed',
            processedData: processedData._id
        });

        return true;
    } catch (error) {
        await FileModel.findByIdAndUpdate(fileId, { 
            status: 'failed',
            error: error.message
        });
        return false;
    }
};

export const getFiles = async (userId: string, filters: any, page: number, limit: number) => {
    const query: any = { uploadedBy: userId };
    
    // Apply filters
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.filename) {
        query.filename = { $regex: filters.filename, $options: 'i' };
    }

    const files = await FileModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await FileModel.countDocuments(query);

    return {
        data: files,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
};