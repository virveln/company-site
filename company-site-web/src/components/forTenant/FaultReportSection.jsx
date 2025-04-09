import TABTITLES from "../../utils/tabTitles";
import FaultReportForm from "./FaultReportForm";

export default function FaultReporttSection() {
    return (
        <div className="flex-1 md:max-w-[800px] md:mt-[-100px]">
            <title>{TABTITLES.FAULT_REPORT}</title>
            <FaultReportForm />
        </div>

    )
};