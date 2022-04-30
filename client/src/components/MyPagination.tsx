import React, {FC} from 'react';
import {Pagination} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faChevronLeft, faChevronRight, faForward} from "@fortawesome/free-solid-svg-icons";
import "../Style/MyPagination.css";
interface props {
    page: number;
    total: number;
    onChange: (page: number) => void;
}
const MAX_PAGE_NUMBER = 500;
const ITEMS_PER_PAGE = 20;
const MyPagination:FC<props>= ({page,onChange,total}) => {
    const totalItems = total*ITEMS_PER_PAGE > MAX_PAGE_NUMBER*ITEMS_PER_PAGE ? MAX_PAGE_NUMBER*ITEMS_PER_PAGE : total*ITEMS_PER_PAGE;
    return (
        <div className="pagination-container">
            <Pagination current={page} total={totalItems} onChange={onChange } pageSize={ITEMS_PER_PAGE}
                        itemRender={(current, type, originalElement) => {
                            if (type === 'prev') {
                                return <FontAwesomeIcon className="fa-icon" icon={faChevronLeft} />
                            }
                            if (type === 'next') {
                                return <FontAwesomeIcon className="fa-icon" icon={faChevronRight} />;
                            }
                            if (type=== 'jump-next') {
                                return <FontAwesomeIcon className="fa-icon" icon={faForward} />;
                            }
                            if (type=== 'jump-prev') {
                                return <FontAwesomeIcon className="fa-icon" icon={faBackward} />;
                            }
                            return <span className={"pagination-item"}>{current}</span>;

                        }}
                        showSizeChanger={false}

            />
        </div>
    );
};

export default MyPagination;