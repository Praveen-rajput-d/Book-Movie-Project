package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.service.QrCocdeService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Service
public class QrCodeServiceImpl  implements QrCocdeService {

    @Override
    public String generateQrCode(String text) {
  try{
      QRCodeWriter qrCodeWriter=new QRCodeWriter();
      BitMatrix bitMatrix=qrCodeWriter.encode(text, BarcodeFormat.QR_CODE,250,250);
      ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
      MatrixToImageWriter.writeToStream(bitMatrix,"PNG",outputStream);
      return Base64.getEncoder().encodeToString(outputStream.toByteArray());
  }catch (WriterException|java.io.IOException e){
      throw new RuntimeException("Failed to Generate QR Code",e);
  }



         }
}
