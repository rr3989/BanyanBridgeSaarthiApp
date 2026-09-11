package com.example.bbsaarthi

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btn1 = findViewById<Button>(R.id.btn_feature1)
        val btn2 = findViewById<Button>(R.id.btn_feature2)
        val btn3 = findViewById<Button>(R.id.btn_feature3)
        val btn4 = findViewById<Button>(R.id.btn_feature4)

        btn1.setOnClickListener { startActivity(Intent(this, VoiceAssessmentActivity::class.java)) }
        btn2.setOnClickListener { Toast.makeText(this, "Feature 2 (placeholder)", Toast.LENGTH_SHORT).show() }
        btn3.setOnClickListener { Toast.makeText(this, "Feature 3 (placeholder)", Toast.LENGTH_SHORT).show() }
        btn4.setOnClickListener { Toast.makeText(this, "Feature 4 (placeholder)", Toast.LENGTH_SHORT).show() }
    }
}
