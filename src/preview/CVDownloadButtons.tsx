import { useCvData } from '../context/CvDataContext';
import { exportToDocx } from './exportUtils';

export const CVDownloadButtons: React.FC = () => {
    const { cvData } = useCvData();

    return (
        <div className="download-buttons">
            <button
                className="btn-download docx"
                onClick={() => exportToDocx(cvData)}
            >
                Download DOCX
            </button>
        </div>
    );
};
