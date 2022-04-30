import React, {FC} from 'react';
import {Pagination} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faChevronLeft, faChevronRight, faForward} from "@fortawesome/free-solid-svg-icons";

interface props {
    page: number;
    total: number;
    onChange: (page: number) => void;
}
const MyPagination:FC<props>= ({page,onChange,total}) => {
    return (
        <div className="pagination-container">
            <Pagination current={page} total={total*20} onChange={onChange } pageSize={20}
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