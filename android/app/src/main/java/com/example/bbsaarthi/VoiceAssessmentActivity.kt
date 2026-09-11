package com.example.bbsaarthi

import android.Manifest
import android.content.pm.PackageManager
import android.media.MediaPlayer
import android.media.MediaRecorder
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import java.io.File

class VoiceAssessmentActivity : AppCompatActivity() {
    private var recorder: MediaRecorder? = null
    private var player: MediaPlayer? = null
    private lateinit var outFile: File

    private val requestPermission = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) {
            // permission granted
            startRecording()
        } else {
            Toast.makeText(this, "Record permission is required", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_voice_assessment)

        outFile = File(cacheDir, "voice_assessment.3gp")

        val startBtn = findViewById<Button>(R.id.btn_start_record)
        val stopBtn = findViewById<Button>(R.id.btn_stop_record)
        val playBtn = findViewById<Button>(R.id.btn_play)
        val status = findViewById<TextView>(R.id.txt_status)

        startBtn.setOnClickListener {
            val has = ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
            if (has == PackageManager.PERMISSION_GRANTED) {
                startRecording()
            } else {
                requestPermission.launch(Manifest.permission.RECORD_AUDIO)
            }
        }

        stopBtn.setOnClickListener {
            stopRecording()
            status.text = "Recorded: ${outFile.absolutePath}"
        }

        playBtn.setOnClickListener {
            if (outFile.exists()) playRecording() else Toast.makeText(this, "No recording", Toast.LENGTH_SHORT).show()
        }
    }

    private fun startRecording() {
        recorder?.release()
        recorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP)
            setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB)
            setOutputFile(outFile.absolutePath)
            try {
                prepare()
                start()
                Toast.makeText(this@VoiceAssessmentActivity, "Recording...", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(this@VoiceAssessmentActivity, "Record failed: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun stopRecording() {
        try {
            recorder?.apply {
                stop()
                release()
            }
        } catch (ignored: Exception) {
        }
        recorder = null
    }

    private fun playRecording() {
        player?.release()
        player = MediaPlayer().apply {
            try {
                setDataSource(outFile.absolutePath)
                prepare()
                start()
            } catch (e: Exception) {
                Toast.makeText(this@VoiceAssessmentActivity, "Play failed: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onStop() {
        super.onStop()
        recorder?.release()
        recorder = null
        player?.release()
        player = null
    }
}
