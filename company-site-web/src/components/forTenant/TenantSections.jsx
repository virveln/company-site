import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TenantSections = ({ sections }) => {
    return (
        <div className="space-y-8 max-w-[600px]">
            {sections.map((section, index) => {
                // Handle sections with links
                if (section.link) {
                    return (
                        <>
                            {section.link.title && (
                                <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">{section.link.title}</h2>
                            )}
                            <p key={index} className="text-gray-700">
                                {section.link.contentBefore}{" "}
                                <Link to={section.link.linkUrl} className="text-[var(--primary-color)] underline underline-offset-3 decoration-[var(--primary-color)] hover:decoration-2" >
                                    {section.link.linkText}
                                </Link>
                                {" "}{section.link.contentAfter}
                            </p>
                        </>
                    );
                }

                // Render sections with title, optional paragraph, and optional list
                return (
                    <div key={index}>
                        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">{section.title}</h2>
                        {section.content && <p dangerouslySetInnerHTML={{ __html: section.content }}></p>}
                        {section.listContent && (
                            <ul className="list-disc pl-6">
                                {section.listContent.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TenantSections;

TenantSections.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                type: PropTypes.oneOf(["p", "ul"]),
                content: PropTypes.oneOfType([
                    PropTypes.string, // For paragraphs
                    PropTypes.arrayOf(PropTypes.string), // For lists
                ]).isRequired,
            }),
            PropTypes.shape({
                link: PropTypes.shape({
                    title: PropTypes.string,
                    type: PropTypes.oneOf(["p"]),
                    contentBefore: PropTypes.string,
                    linkText: PropTypes.string.isRequired,
                    linkUrl: PropTypes.string.isRequired,
                    contentAfter: PropTypes.string,
                }).isRequired,
            }),
        ])
    ).isRequired,
};