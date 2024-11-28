package com.manager.ashrey.controller;

import com.manager.ashrey.dto.RoomDTO;
import com.manager.ashrey.response.ResponseDTO;
import com.manager.ashrey.service.HostelService;
import com.manager.ashrey.service.RoomService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.manager.ashrey.dto.HostelDTO;
import org.apache.poi.ss.usermodel.*;

import java.io.IOException;


@RestController
@RequestMapping("/api/hostel-management")
public class HostelManagementController {

    @Autowired
    private HostelService hostelService;

    @Autowired
    private RoomService roomService;

    @PostMapping(value = "/upload")
    public ResponseEntity<ResponseDTO> uploadExcelFile(@RequestParam("file") MultipartFile file) {
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                String hostelName = getStringCellValue(row.getCell(0));
                String roomNumber = getStringCellValue(row.getCell(1));
                int capacity = parseIntegerCell(row.getCell(2));
                int currentOccupancy = parseIntegerCell(row.getCell(3));
                int floor = parseIntegerCell(row.getCell(4));
                int level = parseIntegerCell(row.getCell(5));
                boolean sunlight = parseBooleanCell(row.getCell(6));
                boolean balcony = parseBooleanCell(row.getCell(7));

                HostelDTO hostelDto = new HostelDTO();
                hostelDto.setHostelName(hostelName);
                var hostel = hostelService.createHostelIfNotExists(hostelDto);

                if (roomService.isRoomExists(roomNumber, hostel.getHostelId())) {
                    System.out.println("Duplicate room entry detected: Room " + roomNumber + " in Hostel " + hostelName);
                    continue;
                }

                RoomDTO roomDto = new RoomDTO();
                roomDto.setRoomNumber(roomNumber);
                roomDto.setCapacity(capacity);
                roomDto.setCurrentOccupancy(currentOccupancy);
                roomDto.setFloor(floor);
                roomDto.setLevel(level);
                roomDto.setSunlight(sunlight);
                roomDto.setBalcony(balcony);
                roomDto.setHostelId(hostel.getHostelId());

                roomService.createRoom(roomDto);
            }

            return ResponseEntity.ok(new ResponseDTO("File uploaded and data processed successfully."));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok(new ResponseDTO("Failed to process file."));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.ok(new ResponseDTO("Invalid data format in Excel file."));
        }
    }



    // Helper methods for safe cell parsing
    private String getStringCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }

    private int parseIntegerCell(Cell cell) {
        try {
            String value = getStringCellValue(cell);
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            return 0; // Default value or throw custom exception if needed
        }
    }

    private boolean parseBooleanCell(Cell cell) {
        String value = getStringCellValue(cell);
        return value.equals("1"); // Adjust based on your data representation
    }


}
