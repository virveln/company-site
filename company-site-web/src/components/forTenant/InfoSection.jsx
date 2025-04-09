import TABTITLES from "../../utils/tabTitles";
import InfoTenantCard from "../InfoTenantCard";

export default function InformationSection() {
    return (
        <div className="grid grid-cols-1 gap-10 justify-center max-w-[600px] mr-auto  md:mt-[-60px]">
            {/* <div className="grid md:grid-cols-2 gap-10 justify-center max-w-[1200px] mx-auto"> */}
            <title>{TABTITLES.INFORMATION}</title>
            <InfoTenantCard />
        </div>
    )
};