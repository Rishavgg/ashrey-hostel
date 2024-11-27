package com.manager.ashrey.controller;

import com.manager.ashrey.dto.BlockDto;
import com.manager.ashrey.dto.HostelDto;
import com.manager.ashrey.dto.RoomDto;
import com.manager.ashrey.entity.RoomType;
import com.manager.ashrey.service.BlockService;
import com.manager.ashrey.service.HostelService;
import com.manager.ashrey.service.RoomService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/hostel-management")
public class HostelManagementController {

    @Autowired
    private HostelService hostelService;

    @Autowired
    private BlockService blockService;

    @Autowired
    private RoomService roomService;

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadExcelFile(@RequestParam("file") MultipartFile file) {
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    // Skip header row
                    continue;
                }

                // Handle each cell based on its type
                String hostelName = getStringCellValue(row.getCell(0));
                String blockName = getStringCellValue(row.getCell(1));
                String roomNumber = getStringCellValue(row.getCell(2));
                String roomTypeString = getStringCellValue(row.getCell(3));

                // Handle RoomType (assumed to be SINGLE or DOUBLE)
                RoomType roomType = RoomType.valueOf(roomTypeString.toUpperCase());

                // Create or find Hostel
                HostelDto hostelDto = new HostelDto();
                hostelDto.setHostelName(hostelName);
                var hostel = hostelService.createHostel(hostelDto);

                // Create Block under Hostel
                BlockDto blockDto = new BlockDto();
                blockDto.setBlockName(blockName);
                blockDto.setHostelId(hostel.getHostelId());
                var block = blockService.createBlock(blockDto);

                // Create Room under Block
                RoomDto roomDto = new RoomDto();
                roomDto.setRoomNumber(roomNumber);
                roomDto.setType(roomType);
                roomDto.setBlockId(block.getBlockId());

                roomService.createRoom(roomDto);
            }

            workbook.close();
            return ResponseEntity.ok("File uploaded and data processed successfully.");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process file.");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data format in Excel file.");
        }
    }

    private String getStringCellValue(org.apache.poi.ss.usermodel.Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                // Handle numeric cells as strings (e.g., room numbers)
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }

}