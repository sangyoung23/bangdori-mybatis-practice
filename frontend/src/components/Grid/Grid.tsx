import {
    ColDef,
    RowSelectionOptions,
    SelectionChangedEvent,
    GridOptions,
    RowClickedEvent,
    CellClickedEvent,
} from 'ag-grid-community'
import './grid.styles.css'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { PropsType } from 'types/grid.type'
import { AG_GRID_LOCALE_KO } from './ag-grid-locale-kr'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

const Grid: React.FC<PropsType> = ({
    items,
    columns,
    selectMode = 'multiRow',
    headerCheckbox = true,
    pagination = true,
    filter = false,
    editable = false,
    resizable = true,
    onselectionchange,
    onRowClick,
    onCellClick,
    height,
}) => {
    const gridRef = useRef<AgGridReact>(null)
    const gridContainerRef = useRef<HTMLDivElement>(null)
    const [gridHeight, setGridHeight] = useState(height || '650px')

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: filter,
            editable: editable,
            cellStyle: {
                textAlign: 'center',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
            },
            resizable: resizable,
            flex: 1,
            minWidth: 100,
            autoSize: true,
            dndSource: false,
        }
    }, [filter, editable, resizable])

    // 그리드 row selection 옵션
    const rowSelection: RowSelectionOptions = {
        mode: selectMode,
        headerCheckbox: headerCheckbox,
    }

    // 전체 그리드 옵션
    const gridOptions: GridOptions = {
        defaultColDef,
        rowSelection,
        pagination,
        localeText: AG_GRID_LOCALE_KO,
        domLayout: 'normal',
        suppressHorizontalScroll: false,
        suppressMovableColumns: true,
    }

    // 화면 크기 변경 감지 및 그리드 사이즈 조정
    useEffect(() => {
        const handleResize = () => {
            // height prop이 전달된 경우 그 값을 사용, 아닌 경우 window 크기 기반 계산
            if (height) {
                setGridHeight(height)
            } else {
                const newHeight = `${window.innerHeight * 0.7}px`
                setGridHeight(newHeight)
            }

            const gridApi = gridRef.current?.api
            if (gridApi) {
                gridApi.sizeColumnsToFit()
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [height])

    const handleSelectionChanged = (event: SelectionChangedEvent) => {
        const row = event.api.getSelectedRows()
        onselectionchange?.(row)
    }

    const handleRowClick = (event: RowClickedEvent) => {
        const row = event.data
        onRowClick?.(row)
    }

    const handleCellClick = (event: CellClickedEvent) => {
        const colId = event.colDef.field
        onCellClick?.(colId as string)
    }

    return (
        <div
            ref={gridContainerRef}
            className={'ag-theme-quartz'}
            style={{ width: '100%', height: gridHeight }}
        >
            <AgGridReact
                ref={gridRef}
                rowData={items}
                columnDefs={columns}
                {...gridOptions}
                onGridReady={params => {
                    params.api.sizeColumnsToFit()
                }}
                onSelectionChanged={handleSelectionChanged}
                onRowClicked={handleRowClick}
                onCellClicked={handleCellClick}
            />
        </div>
    )
}

export default Grid
